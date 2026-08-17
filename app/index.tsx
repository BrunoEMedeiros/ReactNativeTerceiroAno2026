import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function App() {
  //   const [count, setCount] = useState(0);

  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={{ fontSize: 40 }}>{count}</Text>
  //       <Button title="+1" onPress={() => setCount(count + 1)} />
  //       <Button title="-1" onPress={() => setCount(count - 1)} />
  //     </View>
  //   );

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id); // cleanup
  }, []); // [] = roda 1x ao montar

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 40 }}>{seconds}s</Text>
    </View>
  );
}

// export default function Cronometro() {
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const id = setInterval(() => {
//       setSeconds((s) => s + 1);
//     }, 1000);

//     return () => clearInterval(id); // cleanup
//   }, []); // [] = roda 1x ao montar

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 40 }}>{seconds}s</Text>
//     </View>
//   );
// }
