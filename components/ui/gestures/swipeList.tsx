import { View, Text } from "react-native";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
interface UserData {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}
interface swipeListProps {
  data: UserData[] | undefined;
  renderItem: (data: { item: UserData }) => React.ReactElement;
  renderHiddenItem: (data: { item: UserData }) => React.ReactElement;
  isAdmin?: boolean;
  handleEdit?: (user: UserData) => void;
  rightAction?: (user: UserData) => void;
  leftAction?: (user: UserData) => void;
}

const SwipeList = ({
  data,
  renderItem,
  renderHiddenItem,
  isAdmin,
  rightAction,
  leftAction,
}: swipeListProps) => {
  return (
    <>
      <SwipeListView
        data={data}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        disableLeftSwipe={isAdmin}
        closeOnScroll={true}
        onRightAction={
          rightAction
            ? (rowKey, rowMap) => {
                const user = data?.find((u) => u.id === rowKey);
                if (user) rightAction(user);
              }
            : undefined
        }
        onLeftAction={
          leftAction
            ? (rowKey, rowMap) => {
                const user = data?.find((u) => u.id === rowKey);
                if (user) leftAction(user);
              }
            : undefined
        }
        closeOnRowPress={true}
        closeOnRowBeginSwipe={true}
        disableRightSwipe={!isAdmin}
        contentContainerClassName="pb-[30%] border-b-2 border-gray-200"
        contentContainerStyle={{
          paddingBottom: 200,
          overflow: "scroll",
        }}
        rightOpenValue={isAdmin ? -75 : 0} // Adjust based on your design
        leftOpenValue={isAdmin ? 75 : 0} // Adjust based on your design
      />
    </>
  );
};

export default SwipeList;
