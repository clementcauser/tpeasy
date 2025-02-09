import { Company } from "@prisma/client";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { pdfCommonStyles } from "../styles";

interface Props {
  company: Company;
}

function QuoteHeaderPdf({ company }: Props) {
  return (
    <View style={[pdfCommonStyles.rowBetweenCentered, styles.container]}>
      <View style={{ flexDirection: "column" }}>
        <Text style={[pdfCommonStyles.textBold, styles.title]}>
          {company.commercialName}
        </Text>
        <Text style={pdfCommonStyles.text}>{company.legalForm}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={[pdfCommonStyles.rowBetweenCentered, styles.itemContainer]}
        >
          <Text style={pdfCommonStyles.textLight}>{company.address}</Text>
        </View>
        <View
          style={[pdfCommonStyles.rowBetweenCentered, styles.itemContainer]}
        >
          <Text style={pdfCommonStyles.textBold}>
            n° SIRET :{" "}
            <Text style={pdfCommonStyles.textLight}>{company.siret}</Text>
          </Text>
        </View>
        <View
          style={[pdfCommonStyles.rowBetweenCentered, styles.itemContainer]}
        >
          <Text style={pdfCommonStyles.textBold}>
            n° TVA UE :{" "}
            <Text style={pdfCommonStyles.textLight}>{company.taxId}</Text>
          </Text>
        </View>
        <View
          style={[pdfCommonStyles.rowBetweenCentered, styles.itemContainer]}
        >
          <View style={styles.contactItem}>
            <Text style={pdfCommonStyles.textBold}>Email :</Text>
            <Text style={pdfCommonStyles.textLight}>{company.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={pdfCommonStyles.textBold}>Téléphone :</Text>
            <Text style={pdfCommonStyles.textLight}>{company.mainPhone}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderBottom: "1px solid lightgrey",
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  itemContainer: {
    justifyContent: "flex-end",
    gap: 12,
    marginBottom: 4,
  },
  contactItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default QuoteHeaderPdf;
