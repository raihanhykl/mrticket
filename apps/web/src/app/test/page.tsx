'use client';
import { ChangeEvent, useState } from 'react';

export default function DynamicForm() {
  // State untuk menyimpan input
  const [inputList, setInputList] = useState([{
    value: '', 
    ticket_type: '', 
    price: '', 
    stock: '', 
    discount_price: '', 
    disc_start_date: '', 
    disc_end_date: ''
  }]);

  // Fungsi untuk menangani perubahan pada input
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const values = [...inputList];
    
    // Perbarui hanya field yang sesuai dengan 'name'
    values[index] = { ...values[index], [name]: value };
    setInputList(values);
  };

  // Fungsi untuk menambahkan input baru
  const handleAddInput = () => {
    setInputList([...inputList, {
      value: '', 
      ticket_type: '', 
      price: '', 
      stock: '', 
      discount_price: '', 
      disc_start_date: '', 
      disc_end_date: ''
    }]);
  };

  const submit = () => {
    console.log(inputList);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dynamic Form Input</h1>
      <form>
        {inputList.map((input, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="value" // Nama unik untuk input ini
              value={input.value}
              onChange={(event) => handleInputChange(index, event)}
              placeholder={`Input ${index + 1}`}
              style={{ padding: '5px', width: '200px' }}
            />
            <div className="">
              <p>Ticket Type</p>
              <input
                id="ticket_type"
                name="ticket_type" // Nama unik untuk 'ticket_type'
                type="text"
                value={input.ticket_type}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Price</p>
              <input
                id="price"
                name="price" // Nama unik untuk 'price'
                type="text"
                value={input.price}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Stock</p>
              <input
                id="stock"
                name="stock" // Nama unik untuk 'stock'
                type="text"
                value={input.stock}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Discount Price</p>
              <input
                id="discount_price"
                name="discount_price" // Nama unik untuk 'discount_price'
                type="text"
                value={input.discount_price}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Discount Start Date</p>
              <input
                id="disc_start_date"
                name="disc_start_date" // Nama unik untuk 'disc_start_date'
                type="date"
                value={input.disc_start_date}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
            <div className="">
              <p>Discount End Date</p>
              <input
                id="disc_end_date"
                name="disc_end_date" // Nama unik untuk 'disc_end_date'
                type="date"
                value={input.disc_end_date}
                onChange={(event) => handleInputChange(index, event)}
                className="border border-[#D4D8DE] w-full bg-[#F9FAFB] rounded-lg"
              />
            </div>
          </div>
        ))}
      </form>
      <button
        type="button"
        onClick={handleAddInput}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        + Tambah Input
      </button>
      <button type="submit" onClick={submit} style={{ marginLeft: '10px', padding: '10px' }}>
        Submit
      </button>
    </div>
  );
}
