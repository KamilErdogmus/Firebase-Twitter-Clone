const Content = ({ tweet }) => {
  return (
    <div className="my-4">
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          src={tweet.imageContent}
          className="my-3 w-full max-h-[300px]  rounded-lg object-contain  "
          alt="Tweet Image"
        />
      )}
    </div>
  );
};

export default Content;
