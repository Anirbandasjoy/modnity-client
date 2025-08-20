import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

interface Order {
  products: any;
  payload: {
    createdAt: string;
    user: {
      name: string;
      phone: string;
      address: string;
    };
    shippingCost: number;
    products: {
      product: {
        productName: string;
        productImage: string;
      };
      quantity: number;
      price?: number;
    }[];
    paymentInfo: {
      method: string;
      cashPaymentMessage?: string;
      bkashPhone?: string;
      bkashTransactionId?: string;
    };
    inDhaka: boolean;
    trackingId: string;
    totalAmount?: number;
    deliveryFee?: number;
    status?: string;
  };
}

Font.register({
  family: "Siyamrupali",
  src: "/assets/fonts/Siyamrupali.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Siyamrupali",
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },

  // Clean Header
  header: {
    backgroundColor: "#f59e0b",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },

  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },

  companyDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  companyInfo: {
    color: "#fef3c7",
    fontSize: 10,
  },

  invoiceNumber: {
    color: "#fef3c7",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Customer and Order Info
  infoSection: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },

  infoBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 6,
    border: "1 solid #e5e7eb",
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
    borderBottom: "1 solid #d1d5db",
    paddingBottom: 5,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  infoLabel: {
    fontSize: 9,
    color: "#6b7280",
    width: 60,
    fontWeight: "bold",
  },

  infoValue: {
    fontSize: 9,
    color: "#1f2937",
    flex: 1,
  },

  // Products Table
  tableSection: {
    marginBottom: 20,
  },

  tableTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "2 solid #f59e0b",
  },

  table: {
    border: "1 solid #d1d5db",
    borderRadius: 6,
    overflow: "hidden",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottom: "1 solid #d1d5db",
  },

  tableHeaderCell: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottom: "1 solid #f3f4f6",
    alignItems: "center",
  },

  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },

  tableCell: {
    fontSize: 9,
    color: "#1f2937",
  },

  productName: {
    flex: 3,
    fontSize: 9,
    color: "#1f2937",
    paddingRight: 10,
  },

  quantity: {
    flex: 1,
    textAlign: "center",
  },

  price: {
    flex: 1.5,
    textAlign: "right",
  },

  total: {
    flex: 1.5,
    textAlign: "right",
    fontWeight: "bold",
  },

  // Summary Section
  summarySection: {
    marginBottom: 20,
  },

  summaryBox: {
    backgroundColor: "#ffffff",
    border: "1 solid #d1d5db",
    borderRadius: 6,
    padding: 15,
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
    textAlign: "center",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 3,
    borderRadius: 4,
  },

  summaryRowAlt: {
    backgroundColor: "#f9fafb",
  },

  summaryLabel: {
    fontSize: 11,
    color: "#374151",
  },

  summaryValue: {
    fontSize: 11,
    color: "#1f2937",
    fontWeight: "bold",
  },

  totalRow: {
    backgroundColor: "#fef3c7",
    marginTop: 8,
    paddingVertical: 10,
    border: "1 solid #f59e0b",
  },

  totalLabel: {
    fontSize: 14,
    color: "#92400e",
    fontWeight: "bold",
  },

  totalValue: {
    fontSize: 16,
    color: "#92400e",
    fontWeight: "bold",
  },

  // Payment Info
  paymentInfo: {
    backgroundColor: "#f0f9ff",
    padding: 12,
    borderRadius: 6,
    border: "1 solid #0ea5e9",
    marginBottom: 20,
  },

  paymentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0c4a6e",
    marginBottom: 6,
  },

  paymentText: {
    fontSize: 10,
    color: "#0369a1",
  },

  // Footer
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#1f2937",
    borderRadius: 6,
    textAlign: "center",
  },

  footerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },

  footerText: {
    fontSize: 10,
    color: "#d1d5db",
    marginBottom: 4,
  },

  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1 solid #374151",
  },

  contactItem: {
    alignItems: "center",
  },

  contactLabel: {
    fontSize: 8,
    color: "#9ca3af",
    marginBottom: 2,
  },

  contactValue: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

const OrderInvoice = ({ payload, products }: Order) => {
  const date = new Date(payload.createdAt);
  const currentDate = date.toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const currentTime = date.toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const deliveryFee = payload.shippingCost || 0;
  const subtotal = Number(payload?.totalAmount || 0) - Number(deliveryFee);

  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.companyName}>Modnity</Text>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
          </View>
          <View style={styles.companyDetails}>
            <Text style={styles.companyInfo}>
              Phone: +880 1772-838734 | Email: info@modnity.com | Website:
              www.modnity.com
            </Text>
            <Text style={styles.invoiceNumber}>#{payload.trackingId}</Text>
          </View>
        </View>

        {/* Customer & Order Information */}
        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Customer Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{payload.user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{payload.user.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>{payload.user.address}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Order Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date:</Text>
              <Text style={styles.infoValue}>{currentDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Time:</Text>
              <Text style={styles.infoValue}>{currentTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment:</Text>
              <Text style={styles.infoValue}>
                {payload.paymentInfo.method === "cash"
                  ? "Cash on Delivery"
                  : "bKash"}
              </Text>
            </View>
          </View>
        </View>

        {/* Products Table */}
        <View style={styles.tableSection}>
          <Text style={styles.tableTitle}>
            Order Items ({products?.length || 0})
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.productName]}>
                Product Name
              </Text>
              <Text style={[styles.tableHeaderCell, styles.quantity]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.price]}>
                Unit Price
              </Text>
              <Text style={[styles.tableHeaderCell, styles.total]}>Total</Text>
            </View>

            {products?.map((item: any, i: number) => (
              <View
                key={i}
                style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlt : {}]}
              >
                <Text style={[styles.tableCell, styles.productName]}>
                  {stripHtml(item.product.productName)}
                </Text>
                <Text style={[styles.tableCell, styles.quantity]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.price]}>
                  ৳{(item.price ?? 0).toLocaleString()}
                </Text>
                <Text style={[styles.tableCell, styles.total]}>
                  ৳{((item.price ?? 0) * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={[styles.summaryRow, styles.summaryRowAlt]}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                ৳{subtotal.toLocaleString()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Charge:</Text>
              <Text style={styles.summaryValue}>
                ৳{deliveryFee.toLocaleString()}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount:</Text>
              <Text style={styles.summaryValue}>৳0</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>
                ৳{payload?.totalAmount?.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentTitle}>Payment Information</Text>
          <Text style={styles.paymentText}>
            Payment Method:{" "}
            {payload.paymentInfo.method === "cash"
              ? "Cash on Delivery (COD)"
              : "bKash Mobile Banking"}
          </Text>
          {payload.paymentInfo.method === "cash" && (
            <Text style={styles.paymentText}>
              Please keep the exact amount ready for delivery.
            </Text>
          )}
        </View>

        {/* Footer */}
      </Page>
    </Document>
  );
};

export default OrderInvoice;
