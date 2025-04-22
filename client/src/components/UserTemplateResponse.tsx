import { HiDotsHorizontal } from "react-icons/hi";
import { ITemplate } from "../Types/templates/templates.types";
import { IUser } from "../Types/user/user.types";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api/axios.api";
import { toast } from "react-toastify/unstyled";

interface IUserTemplateResponseProps {
  template: ITemplate;
  user: IUser | null;
}

const UserTemplateResponse: React.FC<IUserTemplateResponseProps> = ({ template, user }) => {
  const [responseOpen, setResponseOpen] = useState<boolean>(false);
  const [responseSetting, setResponseSetting] = useState<boolean>(false);

  const handleResponseOpen = () => setResponseOpen((prev) => !prev);
  const handleResponseSetting = () => setResponseSetting((prev) => !prev);

  const responseId = template.template_responses.find(response => response.user.id === user?.id)?.id;

  const handleRemoveResponse = async () => {
    try {
      await request.delete(`template-responses/${responseId}`);
      toast.success("Response Deleted Successfully");
      window.location.reload();
    } catch (err: any) {
      const error = err.response?.data?.message;
      toast.error(error.toString());
    }
  };

    return responseId ? (
        <div className={`bg-white flex flex-col gap-4 box-padding overflow-hidden ${responseOpen ? 'h-auto' : 'h-[45px]'}`}>
            <div className="top-row text-xl flex items-center justify-between">
                <div className="title">My Response</div>
                <div className="response-btns flex gap-3 items-center">
                    <div className="relative">
                        <span>
                            <HiDotsHorizontal className="cursor-pointer" onClick={handleResponseSetting} />
                        </span>
                        <span>
                            <ul className={`absolute z-[10] text-sm top-[15px] right-0 w-[100px] bg-slate-500 text-white sm-padding_1 transition-all ${responseSetting ? "flex flex-col top-[20px]" : "hidden"}`}>
                                <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                    <button onClick={handleRemoveResponse}>Delete</button>
                                </li>

                                <li className="sm-padding-box hover:bg-slate-300 hover:text-gray-600 sm-padding_1">
                                    <Link to={`edit-filled-template/${responseId}`}>Edit</Link>
                                </li>
                            </ul>
                        </span>
                    </div>
                    <div>
                        <IoIosArrowDown
                        className={`cursor-pointer transition ${responseOpen ? 'rotate-180' : 'rotate-0'}`}
                        onClick={handleResponseOpen}
                        />
                    </div>
                </div>
            </div>
            <div className="responses flex flex-col gap-2.5">
                {template.template_responses.map((response) =>
                    response.user.id === user?.id
                        ? response.answers.map((answer, index) => (
                            <div key={index}>
                            <p className="bg-slate-400/60 sm-padding_1">
                                {response.template.questions[index].question}
                            </p>
                            <p className="bg-slate-200/50 sm-padding_1">{answer}</p>
                            </div>
                        ))
                    : null
                )}
            </div>
        </div>
    ) : null;
};

export default UserTemplateResponse;