import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register custom font
Font.register({
  family: "Siyamrupali",
  src: "/assets/fonts/Siyamrupali.ttf",
});

// Register fallback fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfAZ9hjp-Ek-_EeA.woff2",
      fontWeight: 600,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2",
      fontWeight: 700,
    },
  ],
});

// Create sophisticated styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
    fontFamily: "Inter",
    fontSize: 10,
  },

  // Header Section
  headerContainer: {
    backgroundColor: "#F59E0B", // Amber-500
    background: "linear-gradient(135deg, #F59E0B 0%, #EA580C 100%)",
    padding: 30,
    marginBottom: 0,
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  logoSection: {
    flexDirection: "column",
  },

  companyName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  companyTagline: {
    fontSize: 12,
    color: "#FEF3C7", // Amber-100
    marginBottom: 15,
  },

  invoiceTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "right",
    marginBottom: 8,
  },

  invoiceSubtitle: {
    fontSize: 14,
    color: "#FEF3C7",
    textAlign: "right",
  },

  // Decorative elements
  decorativeBar: {
    height: 4,
    backgroundColor: "#FBBF24", // Amber-400
    marginTop: 20,
  },

  // Content Section
  contentContainer: {
    padding: 30,
    flexGrow: 1,
  },

  // Order Info Cards
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    gap: 20,
  },

  infoCard: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Gray-50
    borderRadius: 12,
    padding: 20,
    border: "1px solid #E5E7EB", // Gray-200
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151", // Gray-700
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  cardContent: {
    gap: 8,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 6,
  },

  infoLabel: {
    fontSize: 10,
    color: "#6B7280", // Gray-500
    width: 80,
    fontWeight: 500,
  },

  infoValue: {
    fontSize: 10,
    color: "#1F2937", // Gray-800
    fontWeight: 600,
    flex: 1,
  },

  // Status Badge
  statusBadge: {
    backgroundColor: "#D1FAE5", // Green-100
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },

  statusText: {
    fontSize: 10,
    color: "#065F46", // Green-800
    fontWeight: 600,
    textTransform: "uppercase",
  },

  // Products Table
  tableContainer: {
    marginBottom: 30,
  },

  tableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827", // Gray-900
    marginBottom: 15,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6", // Gray-100
    borderRadius: 8,
    padding: 15,
    marginBottom: 2,
    borderBottom: "2px solid #F59E0B",
  },

  tableHeaderText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151", // Gray-700
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: "row",
    padding: 15,
    borderBottom: "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  tableRowAlt: {
    flexDirection: "row",
    padding: 15,
    borderBottom: "1px solid #E5E7EB",
    backgroundColor: "#FEFEFE",
  },

  tableCell: {
    fontSize: 10,
    color: "#374151",
    paddingRight: 10,
  },

  tableCellBold: {
    fontSize: 10,
    color: "#111827",
    fontWeight: 600,
    paddingRight: 10,
  },

  // Column widths
  col1: { width: "50%" },
  col2: { width: "20%", textAlign: "center" },
  col3: { width: "30%", textAlign: "right" },

  // Summary Section
  summaryContainer: {
    backgroundColor: "#FFFBEB", // Amber-50
    borderRadius: 12,
    padding: 25,
    marginBottom: 30,
    border: "1px solid #FDE68A", // Amber-200
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#78716C", // Stone-500
    fontWeight: 500,
  },

  summaryValue: {
    fontSize: 12,
    color: "#1C1917", // Stone-900
    fontWeight: 600,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    marginTop: 15,
    borderTop: "2px solid #F59E0B",
  },

  totalLabel: {
    fontSize: 16,
    color: "#1C1917",
    fontWeight: "bold",
  },

  totalValue: {
    fontSize: 18,
    color: "#EA580C", // Orange-600
    fontWeight: "bold",
  },

  // Footer Section
  footerContainer: {
    backgroundColor: "#1F2937", // Gray-800
    padding: 30,
    marginTop: "auto",
  },

  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 40,
  },

  footerColumn: {
    flex: 1,
  },

  footerTitle: {
    fontSize: 12,
    color: "#F3F4F6", // Gray-100
    fontWeight: "bold",
    marginBottom: 8,
  },

  footerText: {
    fontSize: 9,
    color: "#D1D5DB", // Gray-300
    lineHeight: 1.4,
    marginBottom: 4,
  },

  footerHighlight: {
    fontSize: 9,
    color: "#FBBF24", // Amber-400
    fontWeight: 600,
  },

  // Thank you message
  thankYouContainer: {
    backgroundColor: "#EFF6FF", // Blue-50
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeft: "4px solid #3B82F6", // Blue-500
  },

  thankYouText: {
    fontSize: 14,
    color: "#1E40AF", // Blue-800
    fontWeight: 600,
    textAlign: "center",
    marginBottom: 5,
  },

  thankYouSubtext: {
    fontSize: 10,
    color: "#1E3A8A", // Blue-900
    textAlign: "center",
  },

  // Watermark
  watermark: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-45deg)",
    fontSize: 48,
    color: "#F3F4F6",
    opacity: 0.1,
    fontWeight: "bold",
    zIndex: -1,
  },
});

interface InvoiceDocumentProps {
  order: any;
}

export const InvoiceDocument = ({ order }: InvoiceDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.logoSection}>
            <Text style={styles.companyName}>PonnoBari</Text>
            <Text style={styles.companyTagline}>Premium Quality Products</Text>
            <Text style={{ fontSize: 10, color: "#FEF3C7" }}>
              📞 +880 1XXXXXXXXX | 🌐 www.ponnobari.com
            </Text>
          </View>

          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceSubtitle}>#{order?.trackingId}</Text>
          </View>
        </View>
        <View style={styles.decorativeBar} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Watermark */}
        <Text style={styles.watermark}>PONNOBARI</Text>

        {/* Order Information Cards */}
        <View style={styles.infoCardsContainer}>
          {/* Bill To Card */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Bill To</Text>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{order.user.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{order.user.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoValue}>{order.user.address}</Text>
              </View>
            </View>
          </View>

          {/* Order Details Card */}
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Order Details</Text>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoValue}>
                  {new Date(order?.orderedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Payment:</Text>
                <Text style={styles.infoValue}>
                  {order.paymentInfo.method === "cash"
                    ? "Cash on Delivery"
                    : "bKash"}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Shipping:</Text>
                <Text style={styles.infoValue}>
                  {order.shippingArea === "dhakaCity"
                    ? "Dhaka City"
                    : order.shippingArea === "dhakaCityOuter"
                    ? "Dhaka Metro"
                    : "Outside Dhaka"}
                </Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>✓ Confirmed</Text>
            </View>
          </View>
        </View>

        {/* bKash Payment Details (if applicable) */}
        {order.paymentInfo.method === "bkash" && (
          <View
            style={{
              backgroundColor: "#FEF2F2", // Red-50
              borderRadius: 12,
              padding: 15,
              marginBottom: 20,
              borderLeft: "4px solid #EF4444", // Red-500
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#DC2626",
                marginBottom: 8,
              }}
            >
              bKash Payment Information
            </Text>
            <View style={{ flexDirection: "row", gap: 30 }}>
              <Text style={{ fontSize: 10, color: "#7F1D1D" }}>
                Phone: {order.paymentInfo.bkashPhone}
              </Text>
              <Text style={{ fontSize: 10, color: "#7F1D1D" }}>
                Transaction ID: {order.paymentInfo.bkashTransactionId}
              </Text>
            </View>
          </View>
        )}

        {/* Thank You Message */}
        <View style={styles.thankYouContainer}>
          <Text style={styles.thankYouText}>
            Thank you for choosing PonnoBari! 🎉
          </Text>
          <Text style={styles.thankYouSubtext}>
            We appreciate your trust in our products and services.
          </Text>
        </View>

        {/* Products Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>
            Order Items ({order.products.length})
          </Text>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col1]}>
              Product Description
            </Text>
            <Text style={[styles.tableHeaderText, styles.col2]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.col3]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {order.products.map((item: any, index: number) => (
            <View
              key={index}
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
            >
              <Text style={[styles.tableCell, styles.col1]}>
                {item.product.productName.replace(/<[^>]*>/g, "")}
                {item.quantity > 1 && (
                  <Text style={{ color: "#6B7280", fontSize: 9 }}>
                    {"\n"}Unit Price: ৳{(item.price / item.quantity).toFixed(0)}{" "}
                    × {item.quantity}
                  </Text>
                )}
              </Text>
              <View style={[styles.col2, { alignItems: "center" }]}>
                <View
                  style={{
                    backgroundColor: "#FEF3C7", // Amber-100
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text style={[styles.tableCellBold, { color: "#92400E" }]}>
                    {item.quantity}
                  </Text>
                </View>
              </View>
              <Text style={[styles.tableCellBold, styles.col3]}>
                ৳{item.price.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ৳{(order.totalAmount - order.shippingCost).toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping & Handling</Text>
            <Text style={styles.summaryValue}>
              ৳{order.shippingCost.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>৳0</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>
              ৳{order.totalAmount.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Order Support</Text>
            <Text style={styles.footerText}>
              📞 Customer Service: +880 1XXXXXXXXX
            </Text>
            <Text style={styles.footerText}>
              ⏰ Support Hours: 9 AM - 9 PM (Daily)
            </Text>
            <Text style={styles.footerText}>
              📧 Email: support@ponnobari.com
            </Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Delivery Information</Text>
            <Text style={styles.footerText}>
              🚛 Processing Time: 1-2 Business Days
            </Text>
            <Text style={styles.footerText}>
              📦 Delivery Time: 1-3 Business Days
            </Text>
            <Text style={styles.footerText}>🔒 Cash on Delivery Available</Text>
          </View>

          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Return Policy</Text>
            <Text style={styles.footerText}>↩️ 7-Day Return Policy</Text>
            <Text style={styles.footerText}>✅ Quality Guaranteed</Text>
            <Text style={styles.footerHighlight}>
              Thank you for shopping with us!
            </Text>
          </View>
        </View>

        <Text
          style={{
            textAlign: "center",
            fontSize: 8,
            color: "#9CA3AF",
            marginTop: 20,
            borderTop: "1px solid #374151",
            paddingTop: 15,
          }}
        >
          This is a computer-generated invoice. No signature required. |
          PonnoBari © 2024 | www.ponnobari.com
        </Text>
      </View>
    </Page>
  </Document>
);
