import { View, Text } from "@react-pdf/renderer";
import { pdfCommonStyles } from "../styles";

export default function QuoteSignaturePdf() {
  return (
    <View
      style={{ padding: 4, border: "1px solid lightgrey", borderRadius: 4 }}
    >
      <Text style={[pdfCommonStyles.textBold, { marginBottom: 4 }]}>
        Bon pour accord
      </Text>
      <Text style={[pdfCommonStyles.text, { marginBottom: 4 }]}>
        Signé le :
      </Text>
      <Text style={[pdfCommonStyles.text, { marginBottom: 4 }]}>À :</Text>
    </View>
  );
}
