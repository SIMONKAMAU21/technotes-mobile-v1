// Update your SwipeList component to accept and handle scroll events
import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

interface SwipeListProps {
  data: any[];
  renderItem: ({ item }: { item: any }) => JSX.Element;
  renderHiddenItem: ({ item }: { item: any }) => JSX.Element;
  isAdmin: boolean;
  onScroll?: (event: any) => void;
  scrollEventThrottle?: number;
}

const SwipeList: React.FC<SwipeListProps> = ({
  data,
  renderItem,
  renderHiddenItem,
  isAdmin,
  onScroll,
  scrollEventThrottle = 16,
}) => {
  return (
    <SwipeListView
      data={data}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-150}
      leftOpenValue={isAdmin ? 150 : 75}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    />
  );
};

export default SwipeList;