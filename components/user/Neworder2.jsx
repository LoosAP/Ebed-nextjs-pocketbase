"use client";

import React, { useState } from "react";

const Neworder = () => {
  const [formData, setFormData] = useState({});

  const [elements, setElements] = useState([]);

  const addElement = () => {
    setFormData({
      ...formData,
      [elements.length]: {
        nap: "",
        menu: "",
        gyumolcsleves: false,
        elvitelesdoboz: false,
      },
    });
    setElements([
      ...elements,
      <div
        key={elements.length}
        className="flex flex-row items-center justify-between gap-4"
      >
        <p>Nap:</p>
        <input
          type="date"
          value={formData[elements.length]?.nap}
          onChange={(e) =>
            setFormData({
              ...formData,
              [elements.length]: {
                ...formData[elements.length],
                nap: e.target.value,
              },
            })
          }
        />
        <p>Menü:</p>
        <select
          value={formData[elements.length]?.menu}
          onChange={(e) =>
            setFormData({
              ...formData,
              [elements.length]: {
                ...formData[elements.length],
                menu: e.target.value,
              },
            })
          }
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="E">E</option>
          <option value="L1">Fix 1</option>
          <option value="L2">Fix 2</option>
        </select>
        <p>Gyümölcslevest kérek: </p>
        <input
          type="checkbox"
          checked={formData[elements.length]?.gyumolcsleves}
          onChange={(e) =>
            setFormData({
              ...formData,
              [elements.length]: {
                ...formData[elements.length],
                gyumolcsleves: e.target.checked,
              },
            })
          }
        />
        <p>Kérek elviteles dobozt:</p>
        <input
          type="checkbox"
          checked={formData[elements.length]?.elvitelesdoboz}
          onChange={(e) =>
            setFormData({
              ...formData,
              [elements.length]: {
                ...formData[elements.length],
                elvitelesdoboz: e.target.checked,
              },
            })
          }
        />
        <button onClick={() => removeElement(elements.length)}>Remove</button>
      </div>,
    ]);
  };

  const removeElement = (index) => {
    const newElements = elements.filter((_, i) => i !== index);
    setElements(newElements);
    const newFormData = { ...formData };
    delete newFormData[index];
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    for (let i = 0; i < elements.length; i++) {
      const elementData = formData[i];
      for (const key in elementData) {
        data.append(`elements[${i}][${key}]`, elementData[key]);
      }
    }
    fetch("/submit", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log("Form submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={addElement}>
        Add Element
      </button>
      {elements.map((elementIndex) => (
        <div key={elementIndex}>
          {elements}
          <button type="button" onClick={() => removeElement(elementIndex)}>
            Remove
          </button>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Neworder;
