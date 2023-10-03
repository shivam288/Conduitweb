using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Conduit.Api.Dto.User;
using Conduit.Core.Models;
using Conduit.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Conduit.Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IPasswordManager _passwordManager;
        private readonly ITokenManager _tokenManager;

        public UserController(
            IUserService userService,
            IMapper mapper,
            IPasswordManager passwordManager,
            ITokenManager tokenManager)
        {
            _userService = userService;
            _mapper = mapper;
            _passwordManager = passwordManager;
            _tokenManager = tokenManager;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<UserResponseDto>> Register([FromBody] UserPostDto userPostDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (await _userService.IsUniqueEmail(userPostDto.Email))
            {
                return Conflict(new { Name = "email", Message = "Email already exist" });
            }

            if (await _userService.IsUniqueUsername(userPostDto.Username))
            {
                return Conflict(new { Name = "username", Message = "Username already exist" });
            }

            var user = _mapper.Map<User>(userPostDto);
            user.Password = _passwordManager.GeneratePassword(userPostDto.Password);

            await _userService.CreateUser(user);

            var userDto = _mapper.Map<UserResponseDto>(user);
            userDto.Token = _tokenManager.GenerateToken(user.Email, user.UserId);

            return Ok(userDto);
        }

        [HttpPost]
        [Route("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<UserResponseDto>> Login([FromBody] UserLoginDto userLoginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userInDb = await _userService.GetByEmail(userLoginDto.Email);
            if (userInDb == null)
            {
                return NotFound();
            }

            if (_passwordManager.VerifyPassword(userLoginDto.Password, userInDb.Password))
            {
                var userDto = _mapper.Map<UserResponseDto>(userInDb);
                userDto.Token = _tokenManager.GenerateToken(userLoginDto.Email, userInDb.UserId);

                return Ok(userDto);
            }

            return Unauthorized();
        }

        [HttpGet]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var user = await _userService.GetByEmail(_tokenManager.GetUserEmail());

            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpPut]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> UpdateUser([FromBody] UserPutDto userPutDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userInDb = await _userService.GetByEmail(_tokenManager.GetUserEmail());

            if (await _userService.IsUniqueUsername(userPutDto.Username, userInDb.Username))
            {
                return Conflict();
            }

            await _userService.UpdateUser(userInDb, _mapper.Map<User>(userPutDto));

            return NoContent();
        }

        [HttpPost]
        [Authorize]
        [Route("resetpassword")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> ChangePassword([FromBody] UserResetPasswordDto userResetPasswordDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userInDb = await _userService.GetByEmail(_tokenManager.GetUserEmail());

            if (_passwordManager.VerifyPassword(userResetPasswordDto.OldPassword, userInDb.Password))
            {
                string newPassword = _passwordManager.GeneratePassword(userResetPasswordDto.NewPassword);
                await _userService.UpdatePassword(userInDb, newPassword);

                return NoContent();
            }

            return Forbid();
        }
    }
}