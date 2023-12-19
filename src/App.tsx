import { useState, useEffect, ChangeEvent } from "react";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

import { getData } from "./utils/data.utils";
import "./App.css";

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log("rendered");

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>("https://jsonplaceholder.typicode.com/users");
      setMonsters(users);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((user) => {
      return user.name.toLocaleLowerCase().includes(searchString);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchString]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.toLocaleLowerCase();
    setSearchString(value);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>

      <SearchBox
        className="monsters-search-box"
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
