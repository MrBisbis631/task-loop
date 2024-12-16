import ColorPicker from "@/components/ui/color-picker";
import React from "react";

type Props = {
  theme: App.Http.Resources.ThemeResource;
};

function Index({ theme }: Props) {
  const [color, setColor] = React.useState("#fff");
  return (<div>
    <ColorPicker color={color} onSetColor={setColor} />
  </div>);
}

export default Index;
