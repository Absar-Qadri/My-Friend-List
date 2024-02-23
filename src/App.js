import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Mozu",
    image: "https://i.pravatar.cc/1000?u=1999912",
    description: `Mauzam Shafi Bhat A.K.A The Pampori Giant. Hailing from pampore you can hear the giant from a mile because of his loud snore.`,
    weakness: "Slow and Stinky",
    strength: "Exploration (Dora the Explorer)",
  },
  {
    id: 933372,
    name: "Ranga",
    image: "https://i.pravatar.cc/1000?u=887911",
    description: `Usman Showkat Rangrez A.K.A Khanyari Khalnayak. This guy comes from a place called Shiraz yet this guy will never be able to keep a 'raaz'.`,
    weakness: "Stomach Issues",
    strength: "Hoon Adij",
  },
  {
    id: 499476,
    name: "Gulla",
    image: "https://i.pravatar.cc/1000?u=5912389",
    description: `Syed Areeb Adil A.K.A Pablo Khiskobar. This guy maybe short but he will definetly take one snot. Hailing from Chaanpora this guy is fearsome.`,
    weakness: " F-Block.",
    strength: " Suction Power.",
  },
];

function Button({ onClick, children }) {
  return (
    <button className="add-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [addForm, setAddForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function showHandleAddFriend() {
    setAddForm((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setAddForm(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
  }
  return (
    <div className="app">
      <div className="friend-component">
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelect={handleSelection}
        />
        <Button onClick={showHandleAddFriend}>
          {addForm ? "Close" : "Add Friend"}
        </Button>
        {addForm && <AddForm onAddFriend={handleAddFriend} />}
      </div>
      {selectedFriend && <FriendInfo selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendList({ friends, onSelect, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendComponent
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function FriendComponent({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "friend-list active" : "friend-list"}>
      <img src={friend.image} alt="profilepic"></img>
      <h3>{friend.name}</h3>
      <Button onClick={() => onSelect(friend)}>
        {isSelected ? "⬅️" : "➡️"}
      </Button>
    </li>
  );
}

function AddForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/1000?");
  const [description, setDescription] = useState("");
  const [weakness, setWeakness] = useState("");
  const [strength, setStrength] = useState("");
  function handleNameChange(e) {
    const inputValue = e.target.value;
    if (/^[A-Za-z]*$/.test(inputValue) || inputValue === "") {
      setName(inputValue);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image || !description || !weakness || !strength) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      description,
      weakness,
      strength,
    };
    onAddFriend(newFriend);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>✍️ Name:</label>
      <input type="text" value={name} onChange={handleNameChange} />
      <label>🖼️ Image Url:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <label>🩸 Weakness</label>
      <input
        type="text"
        value={weakness}
        onChange={(e) => setWeakness(e.target.value)}
      />

      <label>💪 Strength</label>
      <input
        type="text"
        value={strength}
        onChange={(e) => setStrength(e.target.value)}
      />
      <label htmlFor="description">📝 About:</label>
      <textarea
        id="description"
        name="description"
        rows="10"
        cols="50"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="form-add-btn">Add</button>
    </form>
  );
}

function FriendInfo({ selectedFriend }) {
  return (
    <div className="friend-info">
      <img src={selectedFriend.image} alt={selectedFriend.name}></img>
      <h2>{selectedFriend.name}</h2>
      <p>{selectedFriend.description}</p>
      <h2>Weakness: {selectedFriend.weakness}</h2>
      <h2>Strength: {selectedFriend.strength}</h2>
    </div>
  );
}
