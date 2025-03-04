/*******************************************************
API URIs
*******************************************************/
const personal = require('./personal.js')
const menuRole = require('./menuRole.js')
const statusBoard = require('./statusBoard.js')
const compliance = require('./compliance.js')
const policyCategory = require('./policyCategory.js')
const policyItem = require('./policyItem.js')
const user = require('./user.js')
const dept = require('./dept.js')
const log = require('./log.js')
const commonCode = require('./commonCode.js')
const calendar = require('./calendar.js')
const asset = require('./asset.js')
const inspectionAuto = require('./inspectionAuto.js')
const boardNotification = require('./boardNotification.js')
const attachment = require('./attachment.js')
const evidenceAttachment = require('./evidenceAttachment.js')
const policyTag = require('./policyTag.js')
const codeSetting = require('./codeSetting.js')
const securityReviewSetting = require('./securityReviewSetting.js')
const vulnerability = require('./vulnerability.js')
const exceptedVuln = require('./exceptedVuln.js')
const openPortHist = require('./openPortHist.js')
const privacyEvaluation = require('./privacyEvaluation.js')
const securityReviewApply = require('./securityReviewApply.js')
const securityReviewApplyDetail = require('./securityReviewApplyDetail.js')
const securityReviewAudit = require('./securityReviewAudit.js')
const regularInspection = require('./regularInspection.js')
const themeInspection = require('./themeInspection.js')
const realTimeSSE = require('./realTimeSSE.js')
const policyItemDescriptionTemlate = require('./policyItemDescriptionTemplate.js')
const notificationSender = require('./notificationSender.js')
const notification = require('./notification.js')
const manageapproval = require('./manageapproval.js')
const approval = require('./approval.js')
const systemLog = require('./systemLog.js')
const inspectionManual = require('./inspectionManual.js')
const cveInspection = require('./cveInspection.js')
const inspectionPlan = require('./inspectionPlan.js')
const inspectionResult = require('./inspectionResult.js')
const periodInfo = require('./periodInfo.js')
const dashboardSetting = require('./dashboardSetting.js')
const dashboard = require('./dashboard.js')

module.exports = {
  PERSONAL: personal,
  ROLE_MENU: menuRole,
  STATUS_BOARD: statusBoard,
  COMPLIANCE: compliance,
  POLICY_CATEGORY: policyCategory,
  POLICY_ITEM: policyItem,
  USER: user,
  DEPT: dept,
  ROLE: log,
  COMMON_CODE: commonCode,
  CALENDAR: calendar,
  ASSET: asset,
  INSPECTION_AUTO: inspectionAuto,
  BOARD_NOTIFICATION: boardNotification,
  ATTACHMENT: attachment,
  EVIDENCE_ATTACHMENT: evidenceAttachment,
  POLICY_TAG: policyTag,
  CODE_SETTING: codeSetting,
  SEC_REVIEW_SETTING: securityReviewSetting,
  SEC_REVIEW_APPLY: securityReviewApply,
  SEC_REVIEW_APPLY_DETAIL: securityReviewApplyDetail,
  SEC_REVIEW_AUDIT: securityReviewAudit,
  VULNERABILITY: vulnerability,
  EXCEPTEDVULN: exceptedVuln,
  OPEN_PORT_HIST: openPortHist,
  PRI_EVALUATION: privacyEvaluation,
  REG_INSPECTION: regularInspection,
  THE_INSPECTION: themeInspection,
  REAL_TIME_SSE: realTimeSSE,
  POLICY_ITEM_DESCRIPTION_TEMPLATE: policyItemDescriptionTemlate,
  NOTIFICATION_SENDER: notificationSender,
  NOTIFICATION: notification,
  MANAGEAPPROVAL: manageapproval,
  APPROVAL: approval,
  SYSTEMLOG: systemLog,
  INSPECTION_MANUAL: inspectionManual,
  CVE_INSPECTION: cveInspection,
  INSPECTION_RESULT: inspectionResult,
  INSPECCTION_PLAN: inspectionPlan,
  PERIOD_INFO: periodInfo,
  DASHBOARD_SETTING: dashboardSetting,
  DASHBOARD: dashboard
}
