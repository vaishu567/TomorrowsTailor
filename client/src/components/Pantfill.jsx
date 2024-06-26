import { useState } from "react";
import axios from "axios";
import "../styles/style.css";
import { URL } from "../url";
import { useDispatch } from "react-redux";
import {
  setCalculatedPoints,
  setObjlenForVector,
  setFrontViewPoints,
  setbackviewpoints,
  setgridviewpoints,
  setcustomiseduservalues,
  setcalculatedPointsPixels
} from "../context/TrouserSlice";
import Checkoutpage from "./Checkoutpage";
import Navbar from "./Navbar";
const Pantfill = () => {
  const [showcheckout, setShowcheckout] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        URL + "/trouser/calculate",
        { values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      const data = response.data;
      console.log(data.calculatedPoints);
      console.log(data.calculatedPointsPixels);
      dispatch(setCalculatedPoints(data.calculatedPoints));
      dispatch(setcalculatedPointsPixels(data.calculatedPointsPixels));
      dispatch(setFrontViewPoints(data.filteredPoints));
      dispatch(setbackviewpoints(data.filteredbackviewPoints));
      dispatch(setgridviewpoints(data.filteredgridviewPoints));
      dispatch(setcustomiseduservalues(values))
      dispatch(setObjlenForVector(Object.keys(data.calculatedPoints).length));
      setShowcheckout(!showcheckout);
      console.log(showcheckout);
    } catch (error) {
      console.error("Error fetching calculated points:", error);
    }
  };
  return (
    <>
    <Navbar/>
      <form>
        <div className="space-y-12 bg-white p-10 m-20">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Provide Your Tailored Measurements
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              &quot;This information will be forwarded to our skilled tailors
              for meticulous customization, ensuring your garment is crafted to
              perfection. Please provide precise measurements for the optimal
              tailored fit.&quot;
            </p>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10  gap-x-6 gap-y-8 sm:grid-cols-6 flex flex-col">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                A (waist):
                <input
                  type="number"
                  name="A"
                  value={values.A}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                B (Hip):
                <input
                  type="number"
                  name="B"
                  value={values.B}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                C (Waist to Hip):
                <input
                  type="number"
                  name="C"
                  value={values.C}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                D (Body Rise):
                <input
                  type="number"
                  name="D"
                  value={values.D}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                E (Waist to Floor):
                <input
                  type="number"
                  name="E"
                  value={values.E}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                F (Trouser Bottom width):
                <input
                  type="number"
                  name="F"
                  value={values.F}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Checkout
          </button>
        </div>
      </form>
      {showcheckout && (
        <Checkoutpage
          setShowcheckout={setShowcheckout}
          showcheckout={showcheckout}
        />
      )}
    </>
  );
};
export default Pantfill;
