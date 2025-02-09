import { Client, Quote } from "@prisma/client";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { pdfCommonStyles } from "../styles";

interface Props {
  client: Client;
  quote: Quote;
  generatedAt: Date;
}

export default function QuoteRecipientPdf({
  client,
  quote,
  generatedAt,
}: Props) {
  const { container, recipientAddress, quoteTitle } = styles;

  return (
    <View>
      <View style={[pdfCommonStyles.rowBetween, container]}>
        <View style={[pdfCommonStyles.rowBetween, { gap: 12 }]}>
          <Text style={[pdfCommonStyles.textBold, { color: "#444" }]}>
            Destinataire :{" "}
          </Text>
          <View style={recipientAddress}>
            <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
              {client.name}
            </Text>
            <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
              {client.email}
            </Text>
            <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
              {client.address}
            </Text>
            <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
              {client.mainPhone}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[pdfCommonStyles.textBold, quoteTitle]}>Devis</Text>
          <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
            Devis n° : {quote.referenceId}
          </Text>
          <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
            Émis le {format(generatedAt, "dd/MM/yyyy")}
          </Text>
          <Text style={[pdfCommonStyles.text, { marginBottom: 2 }]}>
            Valide jusqu&apos;au {format(quote.expirationDate, "dd/MM/yyyy")}
          </Text>
        </View>
      </View>
      <Text
        style={[pdfCommonStyles.textBold, { fontSize: 16, marginBottom: 12 }]}
      >
        {quote.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginBottom: 40,
  },
  recipientAddress: {
    maxWidth: 200,
  },
  quoteTitle: {
    textAlign: "right",
    marginBottom: 2,
  },
});
