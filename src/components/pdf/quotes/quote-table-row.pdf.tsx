import { QuoteRow } from "@prisma/client";
import { StyleSheet, View, Text } from "@react-pdf/renderer";
import { pdfCommonStyles } from "../styles";
import { getQuoteTaxRateLabel, getQuoteTypeLabel } from "@/lib/utils/quotes";
import { capitalizeFirstLetter, getMoneyPrice } from "@/lib/utils/index";

interface Props {
  row: QuoteRow;
}

export default function QuoteTableRowPdf({ row }: Props) {
  const getValueWithDecimal = (value: number) =>
    (Math.round(value * 100) / 100).toFixed(2).replace(".", ",");

  return (
    <View style={[pdfCommonStyles.row, styles.container]}>
      <View style={styles.colTitle}>
        <Text style={pdfCommonStyles.text}>{row.name}</Text>
        <Text style={[pdfCommonStyles.textLight, { fontSize: 8 }]}>
          {capitalizeFirstLetter(getQuoteTypeLabel(row.type))} -{" "}
          {row.description}
        </Text>
      </View>
      <View style={styles.col2}>
        <Text style={[pdfCommonStyles.text, styles.value]}>{row.quantity}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={[pdfCommonStyles.text, styles.value]}>{row.unit}</Text>
      </View>
      <View style={styles.col2}>
        <Text style={[pdfCommonStyles.text, styles.value]}>
          {getMoneyPrice(getValueWithDecimal(row.unitPrice))}
        </Text>
      </View>
      <View style={styles.colTax}>
        <Text style={[pdfCommonStyles.text, styles.value]}>
          {getQuoteTaxRateLabel(row.taxRate)}
        </Text>
      </View>
      <View style={styles.col2}>
        <Text style={[pdfCommonStyles.text, styles.value]}>
          {getMoneyPrice(getValueWithDecimal(row.totalET))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  colTitle: {
    width: "40%",
  },
  col2: {
    width: "12%",
  },
  colTax: {
    width: "8%",
  },
  value: {
    textAlign: "right",
  },
});
