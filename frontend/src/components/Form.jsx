import React from "react";

const Form = () => {
  return (
    <div className=" bg-[#F8B2B2] py-12 h-[80vh] my-10">
      <div className="mx-auto w-[90%] max-w-xl">
        <h1 className="mb-8 text-center text-4xl font-semibold">
          Manage <span className="bg-fuchsia-500 px-2 text-white">Your</span>
          <br />
          Contacts
        </h1>

        <form className="rounded-lg  bg-white p-6">
          <input
            type="text"
            placeholder="Name"
            className="mb-4 w-full rounded border px-4 py-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Phone"
            className="mb-4 w-full rounded border px-4 py-3"
          />

          <input
            type="text"
            placeholder="Company"
            className="mb-4 w-full rounded border px-4 py-3"
          />

          <select className="mb-5 w-full rounded border px-4 py-3">
            <option value="">Select Status</option>
            <option>Interested</option>
            <option>Follow-Up</option>
            <option>Closed</option>
          </select>

          <button className="w-full rounded bg-fuchsia-500 py-3 text-white hover:bg-fuchsia-600">
            Add Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
