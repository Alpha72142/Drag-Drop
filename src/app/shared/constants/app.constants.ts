export const AppConstants ={

  /***Timeout Constants ***/

  TIMEOUT_TWO_THOUSAND_MS: 2000,
  TIMEOUT_FIVE_HUNDRED_MS: 500,

  /*** Constants For Home Screen ***/
  SCREEN_SHRINK_MIN_WIDTH: 1280,
  ENTER_KEY_ASCII: 13,

   /*** Constants For Card Module ***/
   WINDOW_MIN_WIDTH: 900,

   MESSAGE_TYPE_ERROR: "error",
   MESSAGE_TYPE_WARNING: "warn",
   MESSAGE_SUMMARY: "Error !",
   MESSAGE_WARNING: "Warning",
   MESSAGE_TYPE_SUCCESS: "success",
   MESSAGE_SUMMARY_SUCCESS: "Success",
   MESSAGE_DESC_SUCCESS: "Columns Saved Successfully.",
   MESSAGE_DESC: "Something Doesn't Seems To Be Right At The Moment. Please Try Again Later",
   
   /*** Access Control Form***/

   SSO_ERROR_MSG: "SSO should be 9 digit number",
   VALUE_BLANK: "",

  /*** Constants for smart table module ***/
  CASE_FCE_QUEUE: "fceQueue",
  CASE_HM_QUEUE: "hmQueue",
  CASE_MY_TEAM_QUEUE: "myTeamQueue",
  CASE_TRANSFER_POPUP: "transferDetailsPopUp",
  COMPONENT_TYPE_CUSTOM: "custom",
  TABLE_NAME_FROM_BUC: "From BUC",
  TABLE_NAME_TO_BUC: "To BUC",
  DEFAULT_ROW_COUNT: 25,

  //Link To GMS Portal
  GMS_LINK_URL: "https://www.gemoves.com/v2/gemovesV2/site/static/customer_service_default.php",

  MESSAGE_DATA_SUCCESS: "Data saved successfully."
}

export const UrlConstants = {

  /** Dummy Service Call Urls **/

    DUMMY_SERVICE_URL: "dummyService",

    /***Service Call URLS ***/
    /*** Service variable for employee & requisition search ***/
    SER_REQUISITION_SEARCH_URL: "requisitionSearch/",
    SER_SSO_SEARCH_IN_QUEUE_URL: "empSearchInQueueHM/",
    SER_PIC_EXT: ".jpg"
}