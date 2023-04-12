import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.css";
import { Link } from "react-router-dom";
import {
    faChevronLeft,
    faChevronRight,
    faPen,
    faTrash,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    DeleteData,
    GetListPost,
    GetTags,
    AddDataTable,
    UpdateData,
} from "../../apis";

function Profile() {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [inputDatas, setInputDatas] = useState(null);
    const [post, setPost] = useState(null);
    const [search, setSearch] = useState(null);
    const [listTags, setListTags] = useState([]);
    const [idItem, setIdItem] = useState();
    const [totalPage, setTotalPage] = useState();
    const [currpage, setCurrpage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        post &&
            setTotalPage(Array.from({ length: post.total_page }, () => "item"));
    }, [post]);

    // get list posts
    useEffect(() => {
        getListPosts(search);
    }, [search]);
    const getListPosts = async (search) => {
        const listData = await GetListPost(search);
        console.log(listData);

        if (listData?.data?.posts && listData?.status === 200) {
            setPost(listData?.data);
        }
    };

    // get list tags
    useEffect(() => {
        getTags();
    }, []);

    const getTags = async () => {
        const tags = await GetTags();
        if (tags.status === 200) {
            setListTags(tags.data);
        }
    };

    // Handle add
    const setSelectInput = (e) => {
        if (inputDatas && inputDatas.tags) {
            if (!inputDatas.tags.includes(e.target.value)) {
                setInputDatas((prev) => ({
                    ...prev,
                    tags: [...prev.tags, e.target.value],
                }));
            } else {
                let arr = inputDatas.tags.filter(
                    (item) => !item.includes(e.target.value)
                );
                setInputDatas((prev) => ({
                    ...prev,
                    tags: [...arr],
                }));
            }
        } else {
            let a = [];
            a.push(e.target.value);
            setInputDatas((prev) => ({
                ...prev,
                tags: a,
            }));
        }
    };

    const handleAddData = async () => {
        setIsAdd(false);
        const add = await AddDataTable(inputDatas);
        if (add?.status === 200) {
            getListPosts();
        }
        setSearch({});
        setInputDatas({});
    };

    // handle delete
    const handleDelete = async () => {
        await DeleteData(idItem);
        setIsDelete(false);
        setIdItem(null);
        getListPosts(search);
    };

    // handle Update
    const handleUpdate = async () => {
        setIsUpdate(false);
        setIdItem(null);
        setInputDatas(null);
        let update = await UpdateData(idItem, inputDatas);
        if (update.status === 200) {
            getListPosts(search);
        }
    };
    console.log(post);

    // handleLogout
    const handleLogout = () => {
        localStorage.removeItem("TOKEN");
        navigate("/");
    };

    // next page

    const handleNext = () => {
        console.log(post);
        if (currpage === post.total_page) {
            console.log(123);
            setCurrpage(1);
            setSearch((prev) => ({
                ...prev,
                page: 1,
            }));
        } else {
            setCurrpage((prev) => prev + 1);
            setSearch((prev) => ({
                ...prev,
                page: currpage + 1,
            }));
        }
    };

    // handle back
    const handleBack = () => {
        console.log(post);
        if (currpage === 1) {
            setCurrpage(post.total_page);
            setSearch((prev) => ({
                ...prev,
                page: post.total_page,
            }));
        } else {
            setCurrpage((prev) => prev - 1);
            setSearch((prev) => ({
                ...prev,
                page: currpage - 1,
            }));
        }
    };

    useEffect(() => {
        getListPosts(search);
    }, [currpage]);

    // ramdom page
    const randomPage = (num) => {
        setCurrpage(num);
        setSearch((prev) => ({
            ...prev,
            page: num,
        }));
    };

    return (
        <div className="profile">
            <div className="sidebar">
                <Link to={"/"} className="logo profile__logo">
                    <div className="logo__pre"></div>
                    <div className="logo__second"></div>
                </Link>
                <Link className="sidebar__posts">Posts</Link>
                <button onClick={handleLogout} className="sidebar__logout">
                    Logout
                </button>
            </div>
            <div className="profile__content">
                <div className="profile__content-header">
                    <button onClick={() => setIsAdd(true)} className="btn--m">
                        Add new
                    </button>
                    <div className="profile__input">
                        <input
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            className="profile__input-title"
                            placeholder="Title"
                        />
                        <select
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    tags: e.target.value,
                                }))
                            }
                            className="profile__input-tags"
                        >
                            <option value={""}>All</option>
                            {listTags?.map((item, index) => {
                                return (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <table className="table">
                    <thead>
                        <tr className="table__title">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {post?.posts &&
                        post?.posts?.map((item, index) => {
                            return (
                                <tbody>
                                    <tr key={index} className="table__list">
                                        <th>{index}</th>
                                        <th>{item.title}</th>
                                        <th>{item.description}</th>
                                        <th>{item.tags}</th>
                                        <th className="table__list-icon">
                                            <FontAwesomeIcon
                                                onClick={() => {
                                                    setIsUpdate(true);
                                                    setIdItem(item.id);
                                                }}
                                                className="table__icon"
                                                icon={faPen}
                                            />
                                            <FontAwesomeIcon
                                                onClick={() => {
                                                    setIdItem(item.id);
                                                    setIsDelete(true);
                                                }}
                                                className="table__icon"
                                                icon={faTrash}
                                            />
                                        </th>
                                    </tr>
                                </tbody>
                            );
                        })}
                </table>

                <div className="page">
                    <FontAwesomeIcon
                        onClick={handleBack}
                        className="page__back"
                        icon={faChevronLeft}
                    />

                    {totalPage &&
                        totalPage.map((item, index) => {
                            return (
                                <button
                                    onClick={() => randomPage(index + 1)}
                                    key={index}
                                    id={index + 1}
                                    style={
                                        currpage === index + 1
                                            ? {
                                                  backgroundColor: "#4713ca",
                                              }
                                            : {}
                                    }
                                    className="page__num "
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    <FontAwesomeIcon
                        className="page__next"
                        icon={faChevronRight}
                        onClick={handleNext}
                    />
                </div>
            </div>

            {/* popup update */}

            {isUpdate && (
                <div className="popup">
                    <div className="popup-content">
                        <button
                            onClick={() => {
                                setIsUpdate(false);
                            }}
                            className="popup__close"
                        >
                            <FontAwesomeIcon
                                className="popup__close-icon"
                                icon={faXmark}
                            />
                        </button>
                        <input
                            onChange={(e) =>
                                setInputDatas((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="title"
                            className="profile__input-title popup-title"
                        />
                        <input
                            onChange={(e) =>
                                setInputDatas((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Description"
                            className="profile__input-title popup-description"
                        />
                        <select
                            multiple
                            className="profile__input-tags profile__input-title popup-tags"
                        >
                            <option className="options" value={""}>
                                All
                            </option>
                            {listTags?.map((item, index) => {
                                return (
                                    <option
                                        onClick={setSelectInput}
                                        value={item}
                                        key={index}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            onClick={handleUpdate}
                            className="btn--m popup-btn"
                        >
                            Update
                        </button>
                    </div>
                </div>
            )}

            {/* delete */}

            {isDelete && (
                <div className="popup">
                    <div className="popup-content">
                        <button
                            onClick={() => {
                                setIsDelete(false);
                            }}
                            className="popup__close"
                        >
                            <FontAwesomeIcon
                                className="popup__close-icon"
                                icon={faXmark}
                            />
                        </button>
                        <h2 className="popup-content__title">
                            Are you sure wanna delete this?
                        </h2>
                        <button
                            onClick={handleDelete}
                            className="btn--m popup-btn"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

            {/* add new */}
            {isAdd && (
                <div className="popup">
                    <div className="popup-content">
                        <button
                            onClick={() => {
                                setIsAdd(false);
                                setInputDatas(null);
                            }}
                            className="popup__close"
                        >
                            <FontAwesomeIcon
                                className="popup__close-icon"
                                icon={faXmark}
                            />
                        </button>
                        <input
                            onChange={(e) =>
                                setInputDatas((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="title"
                            className="profile__input-title popup-title"
                        />
                        <input
                            onChange={(e) =>
                                setInputDatas((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Description"
                            className="profile__input-title popup-description"
                        />
                        <select
                            onChange={(e) => console.log(e.target.value)}
                            multiple
                            className="profile__input-tags profile__input-title popup-tags"
                        >
                            <option className="options" value={""}>
                                All
                            </option>
                            {listTags?.map((item, index) => {
                                return (
                                    <option
                                        value={item}
                                        key={index}
                                        onClick={setSelectInput}
                                    >
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <button
                            onClick={() => handleAddData()}
                            className="btn--m popup-btn"
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
