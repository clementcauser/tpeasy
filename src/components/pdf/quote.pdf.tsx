import { Client, Company, Quote, QuoteRow } from "@prisma/client";
import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";
import QuoteHeaderPdf from "./quotes/quote-header.pdf";
import QuoteRecipientPdf from "./quotes/quote-recipient.pdf";
import QuoteTablePdf from "./quotes/quote-table.pdf";
import { pdfCommonStyles } from "./styles";
import QuoteSignaturePdf from "./quotes/quote-signature.pdf";

const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 20 },
  section: { marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  text: { fontSize: 14 },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottom: "1px solid black",
    paddingBottom: 24,
  },
  contactsItemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  contactsCoord: {
    display: "flex",
    flexDirection: "row",
    gap: 14,
  },
  contactsText: {
    fontSize: 10,
  },
  contactsTextLabel: {
    color: "#333",
  },
});

interface Props {
  quote: Quote;
  company: Company;
  client: Client;
  rows: QuoteRow[];
  generatedAt: Date;
}

export default function QuotePdfDocument({
  quote,
  company,
  client,
  rows,
  generatedAt,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <QuoteHeaderPdf company={company} />
        <QuoteRecipientPdf
          client={client}
          quote={quote}
          generatedAt={generatedAt}
        />
        <QuoteTablePdf rows={rows} />
        <View style={{ flex: 1, marginTop: 48 }}>
          <Text style={[pdfCommonStyles.textBold, { marginBottom: 6 }]}>
            Conditions générales
          </Text>
          {quote.comment && (
            <Text style={pdfCommonStyles.text}>{quote.comment}</Text>
          )}
        </View>
        <View style={[pdfCommonStyles.rowBetween, { marginTop: 24 }]}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <QuoteSignaturePdf />
          </View>
        </View>
      </Page>
    </Document>
  );
}
