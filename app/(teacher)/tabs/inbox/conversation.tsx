import { View } from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";

import ConversationScreen from "@/app/(inbox)/conversation";

const Conversation = () => {
  return (
    <View className="flex-1  bg-bg mt-10">
      <ConversationScreen />
    </View>
  );
};

export default Conversation;
