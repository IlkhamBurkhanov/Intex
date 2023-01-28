// import axios from "axios";
// import React, { useState } from "react";
// import TableData from "../TableData/TableData";
// import MLabel from "../../BaseComponents/MLabel/MLabel";
// // Images
// import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
// import Trash from "../../Assets/Images/ProductsImgs/trash_1.svg";
// import { useSelector } from "react-redux";

// import { searchProduction } from "../../redux/siteDataReducer";

// const env = process.env.REACT_APP_ALL_API;
// const imageEnv = process.env.REACT_APP_IMAGE;

// export default function TableRow({
//   children,
//   styles,
//   data,
//   isChecked,
//   refresh,
//   deleteAll,
//   setDeleteAll,
// }) {
//   const [checker, setChecker] = useState(false);
//   const [showModal, setshowModal] = useState(false);
//   const languages = useSelector((state) => state.data.localization);
//   const lang = useSelector((state) => state.data.lang);

//   const token = JSON.parse(window.localStorage.getItem("token"));

//   const handleCheck = (e) => {
//     if (e.target.checked) {
//       setChecker(true);
//       setDeleteAll([...deleteAll, data.id]);
//       e.target.checked = true;
//     } else {
//       setChecker(false);
//       e.target.checked = false;
//       deleteAll = deleteAll.filter((item) => item !== data.id);
//       setDeleteAll(deleteAll);
//     }
//   };

//   // --- Delete Row
//   const DeleteItems = (id) => {
//     axios
//       .delete(`${env}products/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         refresh();
//       })
//       .catch((err) => {
//         err;
//       });
//   };
//   // --- Colse
//   const close = (
//     <svg
//       className="flex items-center justify-center object-fill"
//       width={20}
//       height={20}
//       viewPort="0 0 12 12"
//       version="1.1"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <line x1="1" y1="15" x2="15" y2="1" stroke="black" strokeWidth="2" />
//       <line x1="1" y1="1" x2="15" y2="15" stroke="black" strokeWidth="2" />
//     </svg>
//   );

//   return (
//     <tr className={`flex items-center border-b ${styles}`}>
//       {children ? (
//         children
//       ) : (
//         <>
//           <TableData styles="w-11 pr-3 justify-center">
//             <input
//               className="inputs w-4 h-4"
//               type="checkbox"
//               checked={
//                 checker === true && isChecked === false
//                   ? true
//                   : checker === false && isChecked === false
//                   ? false
//                   : checker === false && isChecked === true
//                   ? true
//                   : checker === true && isChecked === true
//                   ? true
//                   : true
//               }
//               onChange={(e) => handleCheck(e)}
//             />
//           </TableData>
//           <TableData styles="w-[66px]">{data.id}</TableData>
//           <TableData
//             styles="w-[300px] truncate whitespace-nowrap overflow-hidden text-ellipsis"
//             image={false}
//           >
//             {
//               <img
//                 className="mr-2"
//                 src={`${imageEnv}${data.image}`}
//                 alt="Product main"
//                 width={42}
//                 height={38}
//               />
//             }
//             {lang === "ru"
//               ? data.name_ru
//               : lang === "uz"
//               ? data.name_uz
//               : lang === "en"
//               ? data.name_en
//               : ""}
//           </TableData>
//           <TableData styles="w-[153px]">{data.price}</TableData>
//           <TableData styles="w-[153px]">
//             {data.discount_price} {languages[lang].main.sum}
//           </TableData>
//           <TableData styles="w-[99px]">{data.count}</TableData>
//           <TableData styles="w-[147px]">220x150x60см</TableData>
//           <TableData styles="w-[118px]">-</TableData>
//           <TableData styles="w-[140px]">
//             <MLabel type={`label_${data.status_en}`}>
//               {lang === "ru"
//                 ? data.status_ru
//                 : lang === "uz"
//                 ? data.status_uz
//                 : lang === "en"
//                 ? data.status_en
//                 : ""}
//             </MLabel>
//           </TableData>
//           <TableData styles="w-[95px] pr-3 justify-center relative">
//             <button
//               className="mx-auto px-8 py-2"
//               onClick={() => setshowModal(true)}
//             >
//               <img src={ThreeDotsSvg} alt="three dots icon" />
//             </button>
//             {showModal ? (
//               <ul className="bg-white w-[160px] absolute border rounded-lg shadow-lg space-y-2 z-40 right-0">
//                 <div className="relative">
//                   <button
//                     onClick={() => DeleteItems(data.id)}
//                     type="button"
//                     className="flex items-center relative px-2 py-[10px]"
//                   >
//                     <img
//                       className="mr-2"
//                       src={Trash}
//                       alt="just a icon to edit"
//                     />
//                     <span className="block">{languages[lang].main.delete}</span>
//                   </button>
//                   <span
//                     onClick={() => setshowModal(false)}
//                     className="ml-6 absolute top-[6px] cursor-pointer right-0 px-3 py-2"
//                   >
//                     {close}
//                   </span>
//                 </div>
//               </ul>
//             ) : null}
//           </TableData>
//         </>
//       )}
//     </tr>
//   );
// }
