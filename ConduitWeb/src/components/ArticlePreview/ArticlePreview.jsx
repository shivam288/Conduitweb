const ArtclePreview = ({ title, description }) => {
  return (
    <div className='d-flex flex-column align-items-start justify-content-center mt-2'>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default ArtclePreview;
