import { IoSearch } from "react-icons/io5"
import { Link } from "react-router-dom"

interface TemplatesToolBarProps {
    sortByLikes: () => void,
    sortByResponses: () => void
}

const TemplatesToolBar: React.FunctionComponent<TemplatesToolBarProps> = ({ sortByLikes, sortByResponses }) => {
    return (
        <div className="bg-white flex justify-between items-center box-padding">
            <div className="buttons">
                <ul className="flex items-center gap-5">
                    <Link to='create-template' className="text-sm bg-blue-700 sm-padding_1 text-white rounded-md">create</Link>
                    <li
                        className="text-sm cursor-pointer"
                        onClick={sortByLikes}
                    >
                        sort By Likes
                    </li>

                    <li
                        className="text-sm cursor-pointer"
                        onClick={sortByResponses}
                    >
                        Sort By Responses
                    </li>
                </ul>
            </div>
            <div className="relative search flex flex-row-reverse">
                <input
                    type="text"
                    placeholder="search"
                    className="border-2 rounded-md text-sm sm-padding_1 right-padding_1 placeholder:text-sm"
                />
                <span>
                    <IoSearch className="absolute text-lg cursor-pointer right-[7px] top-[50%] translate-y-[-50%]" />
                </span>
            </div>
        </div>
    )
}

export default TemplatesToolBar