import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader({ colspan }) {
  return (
    <React.Fragment>
      <tr className="hover:bg-gray-50">
        <td colSpan={colspan} className="px-8 py-5 text-center">
          <div className="flex justify-center items-center">
            <TailSpin type="Bars" color="#00BFFF" height={50} width={50} />
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}

export default Loader;
