import { useState } from "react";

function ProfileForm() {
  const [imageLink, setImageLink] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="cpp">Create Profile</h2>

      <label htmlFor="image-link">Image link</label>
      <input
        type="text"
        id="image-link"
        value={imageLink}
        onChange={(event) => setImageLink(event.target.value)}
      />

      <label htmlFor="first-name">First name</label>
      <input
        type="text"
        id="first-name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <label htmlFor="last-name">Last name</label>
      <input
        type="text"
        id="last-name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>

      <div>
        <input
          type="checkbox"
          id="verified"
          checked={verified}
          onChange={(event) => setVerified(event.target.checked)}
        />
        <label htmlFor="verified">Talent is verified</label>
      </div>

      <button type="submit">Create Profile</button>
    </form>
  );
}

export default ProfileForm;