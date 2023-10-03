import Tag from '../Tag/Tag';

const TagList = ({ tags, justifyContent = 'end' }) => {
  return (
    <ul className={`d-flex flex-wrap align-items-center ps-0 justify-content-${justifyContent} my-0`}>
      {tags.map(tag => <Tag tag={tag} key={tag} />)}
    </ul>
  );
}

export default TagList;
