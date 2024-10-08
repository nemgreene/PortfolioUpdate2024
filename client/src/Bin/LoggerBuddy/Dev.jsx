import React, { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";

const DevRoot = () => (
  <div>
    <Link to={"tags/tag1"}>Tag1 </Link>
    <Link to={"tags/tag2"}>Tag2 </Link>
    <Outlet />
  </div>
);

const DevContacts = () => {
  const data = useParams();

  useEffect(() => {
    console.log("rendering", Math.random());
  }, [data]);

  return <div>Dev cotnact {data.tag}</div>;
};

export default function Dev() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DevRoot />}>
          <Route path="tags/:tag" element={<DevContacts />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

// const DevRoot = () => (
//   <div>
//     <Link to={"tags/tag1"}>Tag1 </Link>
//     <Link to={"tags/tag2"}>Tag2 </Link>
//     <Outlet />
//   </div>
// );

// const DevContacts = () => {
//   const params = useParams();
//   useEffect(() => {
//     console.log(params);
//     console.log("child rendering rerendering");
//   }, []);
//   return <div>Dev cotnact {params["*"]}</div>;
// };

// export default function Dev() {
//   useEffect(() => {
//     console.log("parent rerendering");
//   }, []);
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<DevRoot />}>
//           <Route path="tags/:tag" element={<DevContacts />}></Route>
//         </Route>
//       </Routes>
//     </div>
//   );
// }
