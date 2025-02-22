import {filteredDate} from '@/libs';

const strings = {
  welcome: 'नमस्ते',
  welcomeText: 'एग्रीगेटर ट्रांसपोर्ट',
  welcomeText1: 'अपने आस पास से अनाज के लोड पाए',
  welcomeText2: 'सबसे बेहतर रेट पर.',
  mo_number: 'मोबाइल नंबर दर्ज करें',
  terms: 'आगे बढ़कर, आप स्वीकार कर रहे है हमारी',
  condition: 'Terms and conditions',
  otp: 'SEND OTP',
  login: 'LOGIN',
  Invertory: 'उपलब्धता',
  Load: 'लोड',
  TruckNumber: 'टायरों की संख्या',
  aggregate: 'एग्रीगेटर',
  deleteByAdmin: 'आपको एडमीन ने डिलीट कर दिया है',
  checkOtp: 'कृपया अपना OTP जांचें',
  trust: 'भरोसा और बढ़ोतरी, दोनों',
  offer: 'आगे बढ़ने के लिए मोबाइल पर आया',
  offer2: 'OTP ',
  offer3: 'दर्ज करें',
  resend: 'OTP दोबारा बुलाएं - ',
  resend2: ' सेकंड',
  registration: 'रजिस्ट्रेशन',
  add_truck: 'ट्रक जोड़ें',
  reg_des: 'एग्रीगेटर के साथ रजिस्टर करें और',
  reg_des2: 'आत्मनिर्भर बनें..',
  name: 'नाम',
  referralCode: 'रेफरल/ऑनबोर्डिंग कोड',
  favRoute: 'आपके सभी पसंदीदा रूट चुने',
  howManyTruck: 'आपके पास कितने ट्रक है ?',
  truck_info: 'अपने ट्रक की जानकारी दें',
  notTruckRc: 'कृपया एक मान्य RC दर्ज करें यह RC ट्रक की नहीं हैं ||',
  noRecordForTruckRc: 'कोई रिकॉर्ड नहीं मिला। कृपया आरसी फोटो अपलोड करें।',
  zero: '1-9 ट्रक',
  ten: '10+ ट्रक',
  loc: 'स्थानीय',
  best_route: 'पसंदीदा रूट',
  ads_proof: 'एड्रेस प्रूफ चुनें',
  doc_upload: 'डॉक्यूमेंट अपलोड करें',
  safe_info: 'आपकी जानकारी हमारे पास सुरक्षित है..',
  register_now: 'REGISTER NOW',
  request_load: 'Request load',
  requested: 'निवेदन दर्ज ',
  truck_number: 'ट्रक नंबर',
  truck_proof: 'ट्रक चुनें',
  rc_upload: 'RC अपलोड करें',
  load_search: 'लोड खोजे',
  order_tag: 'आर्डर ID',
  send_request: 'निवेदन करें ',
  modal_placeholder: 'अपना भाड़ा दर्ज़ करें',
  shipper: 'शिप्पर भाड़ा  -  ',
  you_requested: 'आपकी  बोली',
  requested_loads: 'पिछला लोड',
  bid_accepted: 'निवेदन स्वीकार',
  bid_rejected: 'बोली अस्वीकार',
  loading_address: 'लोडिंग पता',
  advance_fare: 'अग्रिम भारा',
  complete_fare: 'अंतिम भारा',
  truck_no: 'गाड़ी नंबर',
  driver_no: 'ड्राइवर का नंबर',
  search: 'लोड खोजें ',
  note: 'कोई टिप्पणी',
  termsandconditions:
    'By using this App, you agree to be bound by, and to comply with, these Terms and Conditions. If you do not agree to these Terms and Conditions, We reserve the right, at our sole discretion, to modify or otherwise alter these Terms and Conditions at any time. Unless otherwise indicated, amendments will become effective immediately. Please review these Terms and Conditions periodically. Your continued use of the Site following the posting of changes or modifications will constitute your acceptance of the revised Terms and Conditions and the reasonableness of these standards for notice of changes.This page was last updated as of the date at the top of these terms and conditions.Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices.Except our generated dummy copy, which is free to use for private and commercial use. generator.lorem-ipsum.info © 2013.',
  add_truck_alert: 'क्या आप अधिक ट्रक जोड़ना चाहते हैं?',
  field_requirment: 'कृपया सभी स्थाान भरे',
  add_more_truck_alert: 'क्या आप अधिक ट्रक जोड़ना चाहते हैं?',
  account_pay: 'अकाउंट पेय',
  to_pay: 'टू पेय',
  shipper_name: 'शिप्पर नेम',

  my_profile: 'मेरी प्रोफाइल',
  load_post: 'लोड पोस्ट',
  load_date: 'तारीख',
  my_trip: 'मेरी यात्रा',
  fav_trip: 'पसंदीदा लोड',
  trip_no: 'Trip no',
  origin: 'Origin',
  destination: 'Destination',
  pod: 'POD',
  invoice: 'Invoice',
  advance_paid: 'Advance Paid',
  total_payment: 'Total payment',
  active_trip_details: 'Active Trip Details',
  complete_trip_details: 'Complete Trip Details',
  my_trips: 'My Trips',
  payment_status: 'Payment Status',
  my_trucks: 'मेरे ट्रक',
  updateavailability: 'Update Availability',
  uploadpod: 'Upload POD',
  add_truck1: 'ट्रक जोड़ें',
  delete: 'ट्रक हटाएं',
  delete_selected_truck: 'चुने हुए ट्रक हटाएं',
  add_availability: 'उपलब्धता जोड़ें',
  truck_rc: 'अपना ट्रक आर सी खोजें',
  truck_rc_look: 'अपना ट्रक आरसी',
  changeInRc: 'आरसी में बदलाव करें',
  rc: 'आर सी',
  submitError:
    'कृपया आरसी नम्बर, टायरों की संख्या, मालिक संपर्क नंबर,मालिक का नाम दर्ज करे',
  rcError: 'कृपया मान्य आर सी दर्ज करे',
  no_of_tyres: 'टायरों की संख्या',
  owner_contact_number: 'मालिक का नंबर',
  owner_contact_number_error: 'मालिक संपर्क नंबर सही दर्ज करे ',
  owner_name: 'मालिक का नाम',
  enter_pan_number: 'पैन नंबर दर्ज करें',
  bank: 'बैंक',
  account: 'अकाउंट',
  number: 'नंबर',
  ifsc: 'आईएफएससी कोड',
  look_up: 'खोजें',
  verification: 'जाँच',
  target_rs: 'भाड़ा',
  total_rs: 'संपूर्ण भाड़ा',
  update_driver_data: 'ट्रक पक्का करें',
  driver_data_updated: 'ट्रक पक्का किया गया',
  fields_mendat: 'कृपया सभी फ़ील्ड भरें',
  upload_document: 'दस्तावेज़ अपलोड करें',
  no_of_truck: 'ट्रकों की संख्या',
  edit: 'एडिट',
  change: 'बदलाव करे',
  load: 'लोड',
  profile: 'प्रोफ़ाइल',
  contct_us: 'संपर्क करें',
  sign_out: 'प्रस्थान करें',
  next: 'आगे बढ़ें',
  back: 'पीछे चलें',
  submit: 'ट्रक जोड़ें',
  same_as_pan: 'बैंक खाते का नाम पैन कार्ड के नाम के समान होना चाहिए',
  same_as_rc: 'पहचान प्रमाण* (नाम आरसी पर दिए गए नाम के समान होना चाहिए)',
  warning:
    'कृपया अपने बैंक विवरण सावधानीपूर्वक भरें। इसे बदलने के लिए आपके पास केवल दो प्रयास हैं।',
  select_truck: 'ट्रक चुनें',
  driver_number: 'ड्राइवर फोन नंबर',
  driver_name: 'ड्राइवर का नाम',
  aadhar: 'आधार',
  voter_id: 'मतदाता पहचान पत्र',
  electricity_bill: 'बिजली का बिल',
  upload_from_gallery: 'गैलरी से अपलोड करें',
  open_camera: 'कैमरे से तस्वीर लें',
  active: 'चालू',
  history: 'पुरानी',
  payment: 'भुगतान',
  due: 'देय',
  podHindi: 'पीओडी',
  podUpload: 'पीओडी अपलोड करे',
  noPods: 'पीओडी अपलोड नहीं की गयी',
  receipt: 'रसीद',
  addDoc: 'अतिरिक्त दस्तावेज़',
  advancePay: 'एडवांस भुगतान',
  duePay: 'बकाया राशि',
  dueComplete: 'बकाया भुगतान',
  bilty: 'बिल्टी',
  arrive: 'पहुंच',
  advancePending: 'एडवांस पेंडिंग',
  balancePending: 'बैलेन्स पेंडिंग',
  payReceipt: 'भुगतान रसीद',
  commisionTable: 'कमीशन चार्ट',
  dententionChart: 'हाल्टिंग चार्ट ',
  aboutCompany: 'कम्पनी के बारे में',
  contactInfo: 'संपर्क जानकारी',
  mobileNo: 'मोबाइल नंबर',
  panNo: 'पैन नंबर',
  addressProof: 'निवास प्रमाण पत्र',
  providedProof: 'दस्तावेज़ प्रदान किया गया',
  frontPhoto: 'आगे की फ़ोटो',
  backPhoto: 'पीछे की फ़ोटो',
  ownTruck: 'क्या यह आपका ट्रक है ?',
  completePay: 'पूर्ण भुगतान',
  chooseProfile: 'अपनी प्रोफाइल चुनें ....',
  amount: 'राशि',
  buttonNames: {
    owner: 'ट्रक मालिक / Fleet Owner',
    driver: 'ड्राइवर / Driver',
    transporter: 'ट्रांसपोर्टर / Transporter',
  },
  register: {
    rc: 'RC नंबर दर्ज करें',
    rcnumber: 'MP04HC2448',
    driver_Name: 'मोटर मालिक - नाम',
    favRoute: 'पसंदीदा रूट (Lane Preference)',
    rcFind: 'आरसी अपलोड करे',
    notRc: 'कृपया एक मान्य RC दर्ज करें यह RC ट्रक की नहीं हैं ||',
    dl: 'लाइसेन्स फ़ोटो',
    companyName: 'कंपनी नाम',
    place: 'इस्थान',
  },
  kyc: {
    doKyc: 'KYC करें',
    note: 'KYC गाडी लगाने और पेमेंट पाने के लिए अनिवार्य है',
    payment: 'पेमेंट',
    pan: 'पैनकार्ड/Pan-card',
    account: 'अकाउंट नंबर/Account Number',
    reAccount: 'Re-enter Account Number*',
    ifsc: 'IFSC',
    tds: 'टीडीएस घोषणा',
    one: '1 - 9 ट्रक',
    ten: '10+ ट्रक',
    term: (type: string, name: string) =>
      `मैं ${
        type == 'transporter' ? 'ट्रांसपोर्टर' : 'फ्लीट ओनर'
      } ${name}  धारक यह सत्यापित करता हूं की कि मेरे पास ${filteredDate(
        new Date(),
      )} के अनुसार दस से कम मालवाहक वाहन हैं. `,
    term10: (type: string, name: string) =>
      `मैं ${
        type == 'transporter' ? 'ट्रांसपोर्टर' : 'फ्लीट ओनर'
      } ${name} धारक यह सत्यापित करता हूं की कि मेरे पास ${filteredDate(
        new Date(),
      )} के अनुसार दस से अधिक मालवाहक वाहन हैं. `,
    vistingCard: 'विजिटिंग कार्ड',
  },
  truck: {
    buttonNames: {
      availability: 'गाडी उपलब्धता',
      myTruck: 'मेरे ट्रक',
      addTruck: '+ ट्रक जोड़ें',
    },
    truckHeading:
      'अपनी सभी ट्रक एवं नेटवर्क की गाड़ियों को प्रबंदित करने के लिए ट्रक ऐड करें.',
    truckPlaceholder: 'ट्रक नंबर से खोजें ',
  },
  inventory: {
    inventoryHeading:
      'अपनी गाडी की उपलब्धता साझा करें, और पाएं सबसे तेज़ निकटतम लोड्स बेहतर रेट पर.',
    inventoryPlaceholderOrigin: 'कहाँ से (Origin)',
    inventoryPlaceholderDestination: 'कहाँ तक (Destination)',
    loadingAvailability: 'लोडिंग उपलब्धता',
    buttonNames: {
      today: '9 Jul Today',
      mon: '10 Jul Mon',
      Tue: '11 Jul Tue',
      Wed: '12 Jul Wed',
      date: 'तारीख',
      quantity: '1',
      mt: 'MT',
      addAvailability: 'उपलब्धता जोड़ें',
    },
    noFound: 'कोई इन्वेंट्री नहीं जोड़ी गई',
    noLoadForToday: 'आज की तारीख़ के कोई लोड नहीं है|',
  },
  tabs: {
    truck: 'ट्रक',
    load: 'लोड',
    order: 'आर्डर ',
    payment: 'पेमेंट ',
    support: 'सपोर्ट',
  },
  details: {
    accountPay: 'अकाउंट-भुगतान ',
    loading: 'लोडिंग',
    unloading: 'अनलोडिंग',
    note: 'आवशयक सुचना',
    shortage: 'शॉर्टेज:',
    loadingStatus: 'लोडिंग स्थिति:',
    unloadingStatus: 'अनलोडिंग स्थिति:',
    required: (tripal: string) =>
      `${tripal || '3'} तिरपाल, साफ़ गाडी, अर्जेंट लोडिंग, `,
    advance: 'एडवांस - ',
    balance: 'बैलेंस - ',
    requiredNote:
      'ये अपेक्षित लोडिंग शर्तें हैं। ये आवश्यकताओं के अनुसार भिन्न हो सकते हैं।',
  },
  filter: 'फ़िल्टर',
  loadFilter: 'लोड फ़िल्टर',
  doFilter: 'फ़िल्टर करें',
  stock: 'माल',
  loadingDate: 'लोडिंग तारीख',
  current: 'चालू',
  comple: 'समाप्त',
  info: 'सूचना',
  invoices: {
    consignee: 'कन्साइन कॉपी',
    driver: 'ड्राइवर कॉपी',
  },
  upload: 'अपलोड',
  payBill: {
    totalFreight: 'पूर्ण भाड़ा',
    tax: 'टैक्स',
    asalBhada: 'असल भाड़ा',
    agFee: 'AG फीस',
    shortage: 'शोर्तज/ डिडक्शन',
    halting: 'हाल्टिंग',
    cash: 'कैश',
  },
  my_Order: 'मेरे आर्डर',
  my_completed_order: 'सारे आर्डर देखे',
  myLanes: 'मेरी लेन',
  myorder: 'मेरे ऑर्डर',
};

export default strings;
