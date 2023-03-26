import React from "react";
import styled from "styled-components";
import User from "../../../Entities/User";

interface Props {
  users: User[];
  changeSelectedUserId: (id: number) => void;
}

const SelectWrapper = styled.div``;

const Select = styled.select``;

const Option = styled.option``;

function SelectUser(props: Props) {
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value);
    props.changeSelectedUserId(selectedUserId);
  };

  return (
    <SelectWrapper>
      <Select onChange={handleUserChange}>
        <Option value="">Select a User</Option>
        {props.users.map((user) => (
          <Option key={user.id} value={user.id}>
            {user.name}
          </Option>
        ))}
      </Select>
    </SelectWrapper>
  );
}

export default SelectUser;