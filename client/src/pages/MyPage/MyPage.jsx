import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./mypage.css";

const API_URL = "https://week07-assignment-server-kxd3.onrender.com";

export default function MyPage() {
  const userId = Number(localStorage.getItem("userId") || 0);

  const [images, setImages] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    if (!userId) return;

    fetch(`${API_URL}/api/mypage/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.images) {
          setImages(data.images.map(img => ({
            ...img,
            width: img.width || 150,
            height: img.height || 150,
            originalRatio:
              img.width && img.height ? img.width / img.height : 1
          })));
        }
        if (data.textBoxes) setTextBoxes(data.textBoxes);
      })
      .catch(console.error);
  }, [userId]);

  const startImageDrag = (index) => {
    const move = (ev) => {
      setImages(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          x: ev.clientX - updated[index].width / 2,
          y: ev.clientY - updated[index].height / 2,
        };
        return updated;
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const addImage = () => {
    if (!newImageUrl) return;
    setImages([...images, {
      url: newImageUrl,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      originalRatio: 1
    }]);
    setNewImageUrl("");
  };

  const addTextBox = () => {
    if (!newText) return;
    setTextBoxes([...textBoxes, { text: newText, x: 150, y: 150 }]);
    setNewText("");
  };

  const deleteImage = (index) =>
    setImages(images.filter((_, i) => i !== index));

  const deleteText = (index) =>
    setTextBoxes(textBoxes.filter((_, i) => i !== index));

  const saveMyPage = async () => {
    await fetch(`${API_URL}/api/mypage/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, images, textBoxes }),
    });
    alert("MyPage saved!");
  };

  return (
    <>
      <Navbar />
      <div className="mypage-container">
        <div className="controls">
          <input
            type="text"
            placeholder="Image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <button onClick={addImage}>Add Image</button>

          <input
            type="text"
            placeholder="Text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={addTextBox}>Add Text</button>

          <button onClick={saveMyPage}>Save MyPage</button>
        </div>
      </div>
    </>
  );
}
