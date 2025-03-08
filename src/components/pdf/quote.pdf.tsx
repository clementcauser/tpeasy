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
        {quote?.isTaxFree && (
          <Text style={[pdfCommonStyles.text, { marginVertical: 16 }]}>
            TVA non applicable, article 293 B du CGI
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <Text style={[pdfCommonStyles.textBold, { marginBottom: 6 }]}>
            Informations additionnelles
          </Text>
          {quote.comment && (
            <Text style={pdfCommonStyles.text}>{quote.comment}</Text>
          )}
          <View
            style={{
              display: "flex",
              gap: 24,
              flexDirection: "row",
              marginTop: 24,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[pdfCommonStyles.textBold, { marginBottom: 6 }]}>
                Modalités de paiement
              </Text>
              {quote.comment && (
                <Text style={pdfCommonStyles.text}>{quote.paymentTerms}</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[pdfCommonStyles.textBold, { marginBottom: 6 }]}>
                Pénalités en cas de retard
              </Text>
              {quote.comment && (
                <Text style={pdfCommonStyles.text}>{quote.latePenalties}</Text>
              )}
            </View>
          </View>
        </View>
        <Text
          style={[
            pdfCommonStyles.textLight,
            { marginVertical: 16, fontSize: 8 },
          ]}
        >
          En cas de retard de paiement, seront exigibles, conformément au code
          de commerce, une indemnité calculée sur la base de trois fois le taux
          de l&apos;intérêt légal en vigueur ainsi qu&apos;une indemnité
          forfaitaire pour frais de recouvrement de 40€
        </Text>

        <View style={[pdfCommonStyles.rowBetween]}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }}>
            <QuoteSignaturePdf />
          </View>
        </View>
      </Page>
    </Document>
  );
}
