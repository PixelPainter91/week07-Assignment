import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./mypage.css";

export default function MyPage() {
  const userId = Number(localStorage.getItem("userId") || 0);

  const [images, setImages] = useState([]);
  const [textBoxes, setTextBoxes] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newText, setNewText] = useState("");

 
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3000/api/mypage/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.images) setImages(data.images.map(img => ({
          ...img,
          width: img.width || 150,
          height: img.height || 150,
          originalRatio: img.width && img.height ? img.width / img.height : 1
        })));
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

  const startResize = (index, e) => {
    e.stopPropagation();
    const startX = e.clientX;
    // const startY = e.clientY;

    setImages(prev => {
      const updated = [...prev];
      const img = updated[index];
      if (!img.originalRatio) img.originalRatio = img.width / img.height;
      return updated;
    });

    const move = (ev) => {
      setImages(prev => {
        const updated = [...prev];
        const img = updated[index];

        const dx = ev.clientX - startX;
        // const dy = ev.clientY - startY;

        
        let newWidth = img.width + dx;
        let newHeight = newWidth / img.originalRatio;

       
        if (newWidth > 400) { newWidth = 400; newHeight = newWidth / img.originalRatio; }
        if (newHeight > 400) { newHeight = 400; newWidth = newHeight * img.originalRatio; }
        if (newWidth < 50) { newWidth = 50; newHeight = newWidth / img.originalRatio; }
        if (newHeight < 50) { newHeight = 50; newWidth = newHeight * img.originalRatio; }

        updated[index] = {
          ...img,
          width: newWidth,
          height: newHeight,
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

  
  const startTextDrag = (index) => {
    const move = (ev) => {
      setTextBoxes(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], x: ev.clientX - 50, y: ev.clientY - 20 };
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
    setImages([...images, { url: newImageUrl, x: 100, y: 100, width: 150, height: 150, originalRatio: 1 }]);
    setNewImageUrl("");
  };

  const addTextBox = () => {
    if (!newText) return;
    setTextBoxes([...textBoxes, { text: newText, x: 150, y: 150 }]);
    setNewText("");
  };

 
  const deleteImage = (index) => setImages(images.filter((_, i) => i !== index));
  const deleteText = (index) => setTextBoxes(textBoxes.filter((_, i) => i !== index));

  const saveMyPage = async () => {
    await fetch("http://localhost:3000/api/mypage/save", {
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

        <div className="workspace">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="draggable-wrapper"
              style={{ left: img.x, top: img.y, width: img.width, height: img.height }}
            >
              <img
                src={img.url}
                alt="User uploaded"
                className="draggable"
                style={{ width: img.width, height: img.height }}
                onMouseDown={() => startImageDrag(idx)}
              />
              <div className="resize-handle" onMouseDown={(e) => startResize(idx, e)} />
              <button className="delete-btn" onClick={() => deleteImage(idx)}>×</button>
            </div>
          ))}

          {textBoxes.map((tb, idx) => (
  <div
    key={idx}
    className="text-box"
    style={{ left: tb.x, top: tb.y }}
    onMouseDown={() => startTextDrag(idx)}
  >
    <textarea
      value={tb.text}
      onChange={(e) => {
        const updatedText = [...textBoxes];
        updatedText[idx].text = e.target.value;
        setTextBoxes(updatedText);
      }}
      rows={1}
      style={{
        width: "200px",
        resize: "none",
        overflow: "hidden",
        border: "none",
        background: "transparent",
        outline: "none",
        fontSize: "16px",
        fontFamily: "inherit",
        whiteSpace: "pre-wrap",
      }}
      onInput={(e) => {
    
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
    />
    <button className="delete-btn" onClick={() => deleteText(idx)}>×</button>
  </div>
))}

        </div>
      </div>
    </>
  );
}
