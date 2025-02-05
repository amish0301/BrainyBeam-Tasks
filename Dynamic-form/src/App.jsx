import { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line, RiMailLine } from "react-icons/ri";
import { getFieldsFromStorage } from './utils/utils'
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const DynamicForm = () => {

  const [fields, setFields] = useState(getFieldsFromStorage);
  const [selectedType, setSelectedType] = useState("text");
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const inputRefs = useRef({});

  // save in localStorage
  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
    localStorage.setItem("passwords", JSON.stringify(passwordVisibility));
  }, [fields]);

  // Handle input change
  const handleChange = (id, value) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, value } : field)));
  };

  // Add a new field with auto-focus
  const addField = () => {
    const newField = { id: Date.now(), type: selectedType, value: "" };
    setFields([...fields, newField]);

    if (selectedType === "password") {
      setPasswordVisibility(prev => ({ ...prev, [newField.id]: false }));   // initializing password state
    }

    // Delay focusing to ensure new element is rendered
    setTimeout(() => {
      inputRefs.current[newField.id]?.focus();
    }, 100);
  };


  const togglePasswordVisibility = (id) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  // Remove a field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));

    setPasswordVisibility((prev) => {
      const currState = { ...prev };
      delete currState[id];
      return currState;
    })
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.some((field) => field.value.trim() === "")) {
      alert("Please fill in all fields before submitting.");
      return;
    }
    console.log("Form Data:", fields);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="app">
      <h2 className="text-lg mt-5 font-bold mb-2">Dynamic Form</h2>

      {/* Form Container */}
      <div className="p-5 border-2 mt-5">
        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.length > 0 ? (
              fields.map((field) => (
                <div key={field.id} className="flex gap-2 relative">
                  <input
                    ref={(el) => (inputRefs.current[field.id] = el)}
                    type={field.type === "password" && passwordVisibility[field.id] ? "text" : field.type}
                    value={field.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="border p-2 rounded-md w-full"
                    placeholder={`Enter ${field.type}`}
                  />

                  {/* password toggle */}
                  {field.type === "password" && (<button
                    type="button"
                    onClick={() => togglePasswordVisibility(field.id)}
                    className="absolute right-15 top-3 text-gray-500 cursor-pointer"
                  >
                    {passwordVisibility[field.id] ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
                  </button>)}

                  {/* Email Icon */}
                  {field.type === "email" && (
                    <div className="absolute right-15 top-3 text-gray-500">
                      <RiMailLine size={20} />
                    </div>
                  )}

                  <button
                    type="button"
                    className="p-3 text-red-800 cursor-pointer"
                    onClick={() => removeField(field.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center mb-3">No Form Field Added Yet!!</p>
            )}

            {/* Submit Button */}
            {fields.length > 0 && (
              <button
                type="submit"
                className="bg-green-500 text-white w-full my-4 px-4 py-2 rounded cursor-pointer hover:bg-green-600 transition"
              >
                Submit
              </button>
            )}
          </form>
        </div>

        {/* Field Selection */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <label className="font-medium">Select Input Field Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white text-gray-800 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="number">Number</option>
          </select>
          <button
            type="button"
            onClick={addField}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition"
          >
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
