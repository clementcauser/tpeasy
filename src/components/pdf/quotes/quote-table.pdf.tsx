import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdfCommonStyles } from "../styles";
import { QuoteRow } from "@prisma/client";
import QuoteTableRowPdf from "./quote-table-row.pdf";

interface Props {
  rows: QuoteRow[];
}

export default function QuoteTablePdf({ rows }: Props) {
  const getValueWithDecimal = (value: number) =>
    (Math.round(value * 100) / 100).toFixed(2).replace(".", ",");

  const totalET = rows.reduce((prev, curr) => prev + curr.totalET, 0);
  const totalIT = rows.reduce((prev, curr) => prev + curr.totalIT, 0);
  const totalTaxes = totalIT - totalET;

  return (
    <View>
      <QuoteTableHeader />
      <View style={styles.rowsContainer}>
        {rows.map((row) => (
          <QuoteTableRowPdf key={row.id} row={row} />
        ))}
      </View>
      <View
        style={[
          pdfCommonStyles.rowBetween,
          { paddingRight: 24, marginTop: 24 },
        ]}
      >
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          <View style={[pdfCommonStyles.rowBetween, { paddingBottom: 6 }]}>
            <Text style={pdfCommonStyles.text}>Sous-total HT</Text>
            <Text style={pdfCommonStyles.text}>
              {getValueWithDecimal(totalET)}
            </Text>
          </View>
          <View style={[pdfCommonStyles.rowBetween, { paddingBottom: 6 }]}>
            <Text style={pdfCommonStyles.text}>Montant TVA</Text>
            <Text style={pdfCommonStyles.text}>
              {getValueWithDecimal(totalTaxes)}
            </Text>
          </View>
          <View style={[pdfCommonStyles.rowBetween, { paddingBottom: 6 }]}>
            <Text style={pdfCommonStyles.textBold}>Montant total EUR</Text>
            <Text style={pdfCommonStyles.textBold}>
              {getValueWithDecimal(totalIT)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const QuoteTableHeader = () => (
  <View
    style={[
      pdfCommonStyles.row,
      {
        borderBottom: "1px solid lightgrey",
        paddingBottom: 6,
        marginBottom: 6,
      },
    ]}
  >
    <View style={styles.colTitle}>
      <Text style={pdfCommonStyles.text}>Description</Text>
    </View>
    <View style={styles.col2}>
      <Text style={[pdfCommonStyles.text, styles.headerLabel]}>Quantité</Text>
    </View>
    <View style={styles.col2}>
      <Text style={[pdfCommonStyles.text, styles.headerLabel]}>Unité</Text>
    </View>
    <View style={styles.col2}>
      <Text style={[pdfCommonStyles.text, styles.headerLabel]}>
        Prix unitaire
      </Text>
    </View>
    <View style={styles.colTax}>
      <Text style={[pdfCommonStyles.text, styles.headerLabel]}>TVA</Text>
    </View>
    <View style={styles.col2}>
      <Text style={[pdfCommonStyles.text, styles.headerLabel]}>Montant HT</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  colTitle: {
    width: "40%",
  },
  col2: {
    width: "12%",
  },
  colTax: {
    width: "8%",
  },
  headerLabel: {
    textAlign: "right",
  },
  rowsContainer: {
    paddingBottom: 4,
    borderBottom: "1px solid lightgrey",
    marginBottom: 10,
  },
});
