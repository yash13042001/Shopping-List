import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const fetchItems = async (search) => {
    const url = `https://api.frontendeval.com/fake/food/${search}`;
    const result = await fetch(url);
    const data = await result.json();
    console.log(data);
    setShoppingList(data);
  };

  const handleShoppingList = (e) => {
    const idx = e.target.getAttribute(`data-id`);
    //  console.log(idx);
    if (idx) {
      const obj = {
        id: Date.now(),
        data: shoppingList[idx],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setSearch("");
  };

  const handleRightClick = (id) => {
    const copyBucketList = [...bucketList];
    copyBucketList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(copyBucketList);
  };

  const handleDelete = (id) => {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newList);
  };

  useEffect(() => {
    if (search.length >= 2) {
      // Make an Api call
      fetchItems(search);
    }
  }, [search]);
  return (
    <div className="App">
      <h1>My Shopping List</h1>
      <div>
        <input value={search} onChange={handleInput} />
      </div>

      {search.length >= 2 && (
        <div onClick={handleShoppingList} className="shopping-list">
          {shoppingList.map((item, index) => {
            return (
              <div data-id={index} className="product">
                {item}
              </div>
            );
          })}
        </div>
      )}

      <div className="bucket">
        {bucketList.map((item) => {
          return (
            <div className="shopping-item">
              <button onClick={() => handleRightClick(item.id)}>✓</button>
              <div className={item.isDone ? `strike` : ""}>{item.data}</div>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
