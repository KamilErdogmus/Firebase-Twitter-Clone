import moment from "moment";
import { MdEdit } from "react-icons/md";

const turkishToEnglish = (str) => {
  const letters = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    i: "i",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };
  return str.replace(/[çğışöüÇĞİŞÖÜ]/g, (char) => letters[char] || char);
};

const UserInfo = ({ tweet }) => {
  const convertedName = turkishToEnglish(tweet.user.name.toLowerCase())
    .split(" ")
    .join("_");
  let date = tweet?.createdAt?.toDate();
  date = moment(date).fromNow();
  return (
    <div className="flex gap-3 items-center whitespace-nowrap">
      <p>{tweet.user.name}</p>
      <p className="text-gray-500">@{convertedName}</p>

      <p className="text-sm text-gray-400">{date}</p>

      {tweet.isEdited && (
        <div className="text-xs text-gray-400">
          <span className="max-md:hidden">Edited</span>
          <MdEdit className="md:hidden" />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
