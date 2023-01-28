// import React, { useState } from "react";
// import TableData from "../TableData/TableData";
// import MLabel from "../../BaseComponents/MLabel/MLabel";
// import ThreeDotsSvg from "../../Assets/Images/ProductsImgs/threedots.svg";
// import axios from "axios";

// // Image
// import Edit from "../../Assets/Images/ProductsImgs/edit.svg";
// import Trash from "../../Assets/Images/ProductsImgs/trash_1.svg";
// import OrderModal from "../../Pages/Order/OrderModal";

// export default function TableRow2({
//   children,
//   styles,
//   data,
//   isChecked,
//   refresh,
// }) {
//   const [checker, setChecker] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [isShown, setIsShown] = useState(false);

//   const token = JSON.parse(window.localStorage.getItem("token"));

//   const DeleteItems = () => {
//     data.id;
//     token;

//     axios
//       .delete(
//         `https://web-production-5638.up.railway.app/api/orders/delete/${data.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         ("deleted");
//         refresh();
//       })
//       .catch((err) => {
//         err;
//       });
//   };

//   const handleCheck = (e) => {
//     if (e.target.checked) {
//       setChecker(true);
//       e.target.checked = true;
//     } else {
//       setChecker(false);
//       e.target.checked = false;
//     }
//   };
//   const close = (
//     <svg
//       className="flex items-center justify-center object-fill"
//       width={20}
//       height={20}
//       viewport="0 0 12 12"
//       version="1.1"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <line x1="1" y1="15" x2="15" y2="1" stroke="black" strokeWidth="2" />
//       <line x1="1" y1="1" x2="15" y2="15" stroke="black" strokeWidth="2" />
//     </svg>
//   );

//   return (
//     <>
//       <tr className={`flex items-center border-b ${styles}`}>
//         {children ? (
//           children
//         ) : (
//           <>
//             <TableData styles="w-11 pr-3 justify-center">
//               <input
//                 className="inputs h-4 w-4"
//                 type="checkbox"
//                 checked={
//                   checker === true && isChecked === false
//                     ? true
//                     : checker === false && isChecked === false
//                     ? false
//                     : checker === false && isChecked === true
//                     ? true
//                     : checker === true && isChecked === true
//                     ? true
//                     : true
//                 }
//                 onChange={(e) => handleCheck(e)}
//               />
//             </TableData>
//             <TableData styles="w-[80px] ">{data.id}</TableData>
//             <TableData styles="w-[148px] ">{data.order_number}</TableData>
//             <TableData styles="w-[148px] truncate ">{data.name}</TableData>
//             <TableData styles="w-[178px] text-sm">{data.phone}</TableData>
//             <TableData styles="w-[254px] text-blue-500 underline underline-offset-2 text-sm">
//               {data.address ? data.address : "-"}
//             </TableData>
//             <TableData styles="w-[178px] text-sm">
//               {data.count ? data.count : "-"}
//             </TableData>
//             <TableData styles="w-[153px] text-sm">
//               {data.summa ? data.summa + "cум" : "-"}{" "}
//             </TableData>
//             <TableData styles="w-[153px] text-sm">
//               {data.discount_summa ? data.discount_summa + " cум" : "-"}
//             </TableData>
//             <TableData styles="w-[145px] text-sm grid grid-cols">
//               <h4>{data.created_at.slice(0, 10)}</h4>
//               <h5 className="text-xs">{data.created_at.slice(11, 16)}</h5>
//             </TableData>
//             <TableData styles="w-[145px]">
//               <MLabel type={`label_${data.name_en}`}>{data.name_ru}</MLabel>
//             </TableData>
//             <TableData styles="w-[95px] pr-3 justify-center relative">
//               <button
//                 onClick={() => setShowModal(true)}
//                 type="button"
//                 className="px-8 py-2"
//               >
//                 <img src={ThreeDotsSvg} alt="three dots icon" />
//               </button>
//               {showModal ? (
//                 <ul className="bg-white w-[160px] absolute border rounded-lg shadow-lg space-y-2 z-40 -right-0">
//                   <div className="relative">
//                     <button
//                       onClick={() => setIsShown(true)}
//                       type="button"
//                       className="flex items-center relative px-2 py-[10px]"
//                     >
//                       <img
//                         className="mr-2"
//                         src={Edit}
//                         alt="just a icon to edit"
//                       />
//                       <span className="block">Изменить</span>
//                     </button>
//                     <button
//                       onClick={() => DeleteItems(data.id)}
//                       type="button"
//                       className="flex items-center relative px-2 py-[10px]"
//                     >
//                       <img
//                         className="mr-2"
//                         src={Trash}
//                         alt="just a icon to edit"
//                       />
//                       <span className="block">Удалить</span>
//                     </button>
//                     <span
//                       onClick={() => setShowModal(false)}
//                       className="ml-6 absolute top-[6px] cursor-pointer right-0 px-3 py-2"
//                     >
//                       {close}
//                     </span>
//                   </div>
//                 </ul>
//               ) : null}
//             </TableData>
//           </>
//         )}
//       </tr>

//       <OrderModal
//         isShown={isShown}
//         onClosed={() => setIsShown(false)}
//         items={data}
//         refreshed={refresh}
//       />
//     </>
//   );
// }
