const { XMLParser } = require("fast-xml-parser");

function num(n) {
  const v = Number(String(n || "0").replace(/[^\d.-]/g, ""));
  return Number.isFinite(v) ? v : 0;
}

function parseXmlBuffer(file) {
  const parser = new XMLParser({ ignoreAttributes: false });
  const xmlText = file.buffer.toString("utf8");
  const parsed = parser.parse(xmlText);

  const root = parsed?.INProfileResponse || {};
  const cais = root?.CAIS_Account || {};
  const caisDetails = Array.isArray(cais.CAIS_Account_DETAILS)
    ? cais.CAIS_Account_DETAILS[0]
    : cais.CAIS_Account_DETAILS;

  // ✅ Extract applicant info (from Current_Application)
  const applicant = root?.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};

  // ✅ Extract holder info (from CAIS_Account_DETAILS)
  const holder = caisDetails?.CAIS_Holder_Details || {};
  const holderPhone = caisDetails?.CAIS_Holder_Phone_Details || {};
  const holderID = caisDetails?.CAIS_Holder_ID_Details || {};

  // ✅ Extract credit score
  const score = root?.SCORE?.BureauScore || 0;

  // ✅ Extract summary info
  const summaryData = root?.CAIS_Account?.CAIS_Summary || {};
  const creditAccount = summaryData?.Credit_Account || {};
  const totalOutstanding = summaryData?.Total_Outstanding_Balance || {};

  const data = {
    sourceFileName: file.originalname,
    basic: {
      name:
        (applicant.First_Name || "") +
          " " +
          (applicant.Last_Name || "") ||
        (holder.First_Name_Non_Normalized && holder.Surname_Non_Normalized
          ? `${holder.First_Name_Non_Normalized} ${holder.Surname_Non_Normalized}`
          : "N/A"),
      mobile:
        applicant.MobilePhoneNumber ||
        holderPhone.Telephone_Number ||
        "N/A",
      pan:
        holderID.Income_TAX_PAN ||
        holder.Income_TAX_PAN ||
        applicant.IncomeTaxPan ||
        "N/A",
      creditScore: num(score),
    },

    summary: {
      totalAccounts: num(creditAccount.CreditAccountTotal),
      activeAccounts: num(creditAccount.CreditAccountActive),
      closedAccounts: num(creditAccount.CreditAccountClosed),
      currentBalanceTotal: num(totalOutstanding.Outstanding_Balance_All),
      securedAmount: num(totalOutstanding.Outstanding_Balance_Secured),
      unsecuredAmount: num(totalOutstanding.Outstanding_Balance_UnSecured),
      last7DaysEnquiries: num(root.TotalCAPS_Summary?.TotalCAPSLast7Days || 0),
    },

    accounts: (Array.isArray(cais.CAIS_Account_DETAILS)
      ? cais.CAIS_Account_DETAILS
      : [cais.CAIS_Account_DETAILS]
    )
      .filter(Boolean)
      .map((acc) => ({
        bank: acc?.Subscriber_Name?.trim() || "N/A",
        accountNumber: acc?.Account_Number || "N/A",
        amountOverdue: num(acc?.Amount_Past_Due),
        currentBalance: num(acc?.Current_Balance),
        address: acc?.CAIS_Holder_Address_Details?.City_non_normalized || "N/A",
        secured:
          (acc?.Portfolio_Type || "").toLowerCase() === "r" ? true : false,
      })),
  };

  console.log("✅ Extracted Data (Basic):", data.basic);
  return data;
}

module.exports = { parseXmlBuffer };
