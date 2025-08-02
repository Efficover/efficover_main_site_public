import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, AlertCircle, DollarSign, User, Shield, Play, Pause, X } from 'lucide-react';

const EOBDemoProcessor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [eobSummaryTab, setEobSummaryTab] = useState('overview');
  const [reconciliationStep, setReconciliationStep] = useState('extract');
  const [reconciliationTab, setReconciliationTab] = useState('summary');
  const [reconciliationResults, setReconciliationResults] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEOBModal, setShowEOBModal] = useState(false);

  // Demo EOB data - simulating the EOB processing results
  const demoResults = {
    filename: "Delta Dental Sample EOB",
    file_type: "png",
    total_text_blocks: 1,
    results: [{ text: "Text extracted via AI processing - see EOB Summary for details" }],
    eob_processing: {
      eob_summary: {
        patient_info: {
          name: "John Wright",
          dob: "1/1/1950",
          subscriber_id: "XXXX5555",
          insurance: "Delta Dental Plans Assoc",
          claim_number: "AB-445-24445",
          dentist: "AJ M. Dentist"
        },
        procedures: [
          {
            date: "3/3/2018",
            code: "9210",
            description: "Periodic Oral Evaluation",
            submitted_amount: 106.00,
            allowed_amount: 106.00,
            deductible: 25.00,
            coinsurance: 80,
            patient_responsibility: 41.20,
            insurance_payment: 64.80,
            status: "paid"
          },
          {
            date: "3/3/2018",
            code: "2330",
            description: "Crown - Porcelain/Ceramic",
            submitted_amount: 116.00,
            allowed_amount: 116.00,
            deductible: 0.00,
            coinsurance: 100,
            patient_responsibility: 0.00,
            insurance_payment: 116.00,
            status: "paid"
          },
          {
            date: "3/3/2018",
            code: "4910",
            description: "Periodontal Maintenance",
            submitted_amount: 170.00,
            allowed_amount: 170.00,
            deductible: 0.00,
            coinsurance: 100,
            patient_responsibility: 170.00,
            insurance_payment: 0.00,
            status: "denied",
            denial_reason: "Frequency limitation - already covered this year"
          }
        ],
        benefit_summary: {
          annual_deductible: 25.00,
          deductible_met: 25.00,
          annual_maximum: 2500.00,
          amount_used: 180.80,
          remaining_benefit: 2319.20
        },
        totals: {
          total_billed: 392.00,
          total_allowed: 392.00,
          total_paid: 180.80,
          patient_responsibility: 211.20
        }
      },
      insights: [
        "Patient deductible fully met for the year",
        "Procedure 4910 denied due to frequency limitations",
        "Annual maximum has $2,319.20 remaining",
        "Total patient responsibility: $211.20",
        "Consider appealing procedure 4910 denial"
      ]
    },
    eob_summary: {
      patient_info: {
        name: "John Wright",
        dob: "1/1/1950",
        subscriber_id: "XXXX5555",
        insurance: "Delta Dental Plans Assoc",
        claim_number: "AB-445-24445",
        dentist: "AJ M. Dentist"
      },
      procedures: [
        {
          date: "3/3/2018",
          code: "9210",
          description: "Periodic Oral Evaluation",
          submitted_amount: 106.00,
          allowed_amount: 106.00,
          deductible: 25.00,
          coinsurance: 80,
          patient_responsibility: 41.20,
          insurance_payment: 64.80,
          status: "paid"
        },
        {
          date: "3/3/2018",
          code: "2330",
          description: "Crown - Porcelain/Ceramic",
          submitted_amount: 116.00,
          allowed_amount: 116.00,
          deductible: 0.00,
          coinsurance: 100,
          patient_responsibility: 0.00,
          insurance_payment: 116.00,
          status: "paid"
        },
        {
          date: "3/3/2018",
          code: "4910",
          description: "Periodontal Maintenance",
          submitted_amount: 170.00,
          allowed_amount: 170.00,
          deductible: 0.00,
          coinsurance: 100,
          patient_responsibility: 170.00,
          insurance_payment: 0.00,
          status: "denied",
          denial_reason: "Frequency limitation - already covered this year"
        }
      ],
      benefit_summary: {
        annual_deductible: 25.00,
        deductible_met: 25.00,
        annual_maximum: 2500.00,
        amount_used: 180.80,
        remaining_benefit: 2319.20
      },
      totals: {
        total_billed: 392.00,
        total_allowed: 392.00,
        total_paid: 180.80,
        patient_responsibility: 211.20
      }
    },
    insights: [
      "Patient deductible fully met for the year",
      "Procedure 4910 denied due to frequency limitations",
      "Annual maximum has $2,319.20 remaining",
      "Total patient responsibility: $211.20",
      "Consider appealing procedure 4910 denial"
    ],
    processing_method: "ai_processing"
  };

  const startDemo = async () => {
    setIsPlaying(true);
    setIsLoading(true);
    setResults(null);
    setReconciliationResults(null);
    setReconciliationStep('extract');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setResults(demoResults);
    setIsLoading(false);
  };

  const handleReconcile = async () => {
    setReconciliationStep('reconcile');
    setIsLoading(true);

    // Simulate reconciliation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Demo reconciliation results
    const demoReconciliationResults = {
      patient_info: {
        name: "John Wright",
        id: "PAT-001",
        dob: "1/1/1950",
        phone: "(555) 123-4567",
        email: "john.wright@email.com",
        address: "456 Happy Lane, Chicago, IL 54321",
        insurance: "Delta Dental Plans Assoc",
        subscriber_id: "XXXX5555",
        match_confidence: 0.95
      },
      procedures_info: {
        found_procedures: 2,
        total_procedures: 3,
        procedures: [
          {
            code: "9210",
            description: "Periodic Oral Evaluation",
            date: "3/3/2018",
            status: "matched",
            claim_id: "CLM-001",
            submitted_amount: 106.00,
            eob_allowed: 106.00,
            difference: 0.00
          },
          {
            code: "2330",
            description: "Crown - Porcelain/Ceramic",
            date: "3/3/2018",
            status: "matched",
            claim_id: "CLM-002",
            submitted_amount: 116.00,
            eob_allowed: 116.00,
            difference: 0.00
          },
          {
            code: "4910",
            description: "Periodontal Maintenance",
            date: "3/3/2018",
            status: "not_found",
            claim_id: null,
            submitted_amount: null,
            eob_allowed: 170.00,
            difference: null
          }
        ]
      },
      voc_data: {
        deductible: {
          individual: 25.00,
          family: 75.00,
          met_individual: 25.00,
          met_family: 25.00,
          remaining_individual: 0.00,
          remaining_family: 50.00
        },
        annual_maximum: {
          individual: 2500.00,
          family: 5000.00,
          used_individual: 180.80,
          used_family: 180.80,
          remaining_individual: 2319.20,
          remaining_family: 4819.20
        },
        coverage_details: {
          "9210": { coverage: 80, frequency: "2 per year", limitations: "None" },
          "2330": { coverage: 100, frequency: "1 per 5 years", limitations: "Pre-authorization required" },
          "4910": { coverage: 100, frequency: "4 per year", limitations: "After initial periodontal treatment" }
        }
      },
      comparison_results: {
        total_discrepancies: 1,
        discrepancies: [
          {
            type: "denial",
            procedure_code: "4910",
            description: "Periodontal Maintenance",
            reason: "Frequency limitation exceeded",
            action_needed: "Appeal or patient education",
            priority: "high"
          }
        ],
        revenue_impact: {
          denied_amount: 170.00,
          underpaid_amount: 0.00,
          total_impact: 170.00
        }
      },
      reconciliation_summary: {
        status: "requires_action",
        patient_matched: true,
        procedures_matched: 2,
        total_procedures: 3,
        coverage_verified: true,
        issues_found: 1
      },
      insights: [
        "Patient John Wright successfully matched with 95% confidence",
        "2 out of 3 procedures matched with submitted claims",
        "Procedure 4910 not found in submitted claims - may need claim submission",
        "VOC coverage verified - procedure 4910 has frequency limitations",
        "Total revenue impact: $170.00 from denied procedure",
        "Recommend: Submit claim for procedure 4910 or appeal denial"
      ],
      next_steps: [
        "Submit claim for procedure 4910 if not already submitted",
        "Review frequency limitations for periodontal maintenance",
        "Contact patient about denied procedure and options",
        "Consider appealing denial if clinical justification exists",
        "Update patient records with EOB information"
      ]
    };

    setReconciliationResults(demoReconciliationResults);
    setIsLoading(false);
  };

  const renderEOBSummary = () => {
    if (!results?.eob_summary) return null;

    const eobSummary = results.eob_summary;
    const deniedProcedures = eobSummary.procedures.filter((p: any) => p.status === 'denied');
    const underpaidProcedures = eobSummary.procedures.filter((p: any) => p.status === 'paid' && p.patient_responsibility > 0);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          EOB Summary
        </h3>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'denied', label: 'Denied', icon: AlertCircle, count: deniedProcedures.length },
            { id: 'underpaid', label: 'Underpaid', icon: DollarSign, count: underpaidProcedures.length }
          ].map(({ id, label, icon: Icon, count }) => (
            <button
              key={id}
              onClick={() => setEobSummaryTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                eobSummaryTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {count !== undefined && count > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {eobSummaryTab === 'overview' && (
          <div className="space-y-6">
            {/* Patient & Insurance Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Name:</span> {eobSummary.patient_info.name}</div>
                  <div><span className="font-medium">DOB:</span> {eobSummary.patient_info.dob}</div>
                  <div><span className="font-medium">Insurance:</span> {eobSummary.patient_info.insurance}</div>
                  <div><span className="font-medium">Claim #:</span> {eobSummary.patient_info.claim_number}</div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Benefit Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Deductible:</span> ${eobSummary.benefit_summary.deductible_met.toFixed(2)} of ${eobSummary.benefit_summary.annual_deductible.toFixed(2)} met</div>
                  <div><span className="font-medium">Annual Max:</span> ${eobSummary.benefit_summary.amount_used.toFixed(2)} of ${eobSummary.benefit_summary.annual_maximum.toFixed(2)} used</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(eobSummary.benefit_summary.amount_used / eobSummary.benefit_summary.annual_maximum) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">${eobSummary.benefit_summary.remaining_benefit.toFixed(2)} remaining</div>
                </div>
              </div>
            </div>

            {/* Procedures */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Procedures</h4>
              <div className="space-y-3">
                {eobSummary.procedures.map((procedure: any, index: number) => (
                  <div key={index} className={`border rounded-lg p-4 ${
                    procedure.status === 'denied' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-900">{procedure.code} - {procedure.description}</div>
                        <div className="text-sm text-gray-600">{procedure.date}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        procedure.status === 'denied' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {procedure.status.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><span className="font-medium">Submitted:</span> ${procedure.submitted_amount.toFixed(2)}</div>
                      <div><span className="font-medium">Allowed:</span> ${procedure.allowed_amount.toFixed(2)}</div>
                      <div><span className="font-medium">Patient:</span> ${procedure.patient_responsibility.toFixed(2)}</div>
                      <div><span className="font-medium">Insurance:</span> ${procedure.insurance_payment.toFixed(2)}</div>
                    </div>
                    {procedure.denial_reason && (
                      <div className="mt-2 text-sm text-red-700 bg-red-100 p-2 rounded">
                        <span className="font-medium">Denial Reason:</span> {procedure.denial_reason}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-medium">Total Billed:</span> ${eobSummary.totals.total_billed.toFixed(2)}</div>
                <div><span className="font-medium">Total Allowed:</span> ${eobSummary.totals.total_allowed.toFixed(2)}</div>
                <div><span className="font-medium">Insurance Paid:</span> ${eobSummary.totals.total_paid.toFixed(2)}</div>
                <div><span className="font-medium">Patient Responsibility:</span> ${eobSummary.totals.patient_responsibility.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {eobSummaryTab === 'denied' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Denied Procedures</h4>
            {deniedProcedures.length > 0 ? (
              deniedProcedures.map((procedure: any, index: number) => (
                <div key={index} className="border border-red-200 bg-red-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{procedure.code} - {procedure.description}</div>
                      <div className="text-sm text-gray-600">{procedure.date}</div>
                    </div>
                    <div className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      DENIED
                    </div>
                  </div>
                  <div className="text-sm text-red-700 bg-red-100 p-3 rounded">
                    <span className="font-medium">Denial Reason:</span> {procedure.denial_reason}
                  </div>
                  <div className="mt-3 text-sm">
                    <span className="font-medium">Amount:</span> ${procedure.submitted_amount.toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>No denied procedures found</p>
              </div>
            )}
          </div>
        )}

        {eobSummaryTab === 'underpaid' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Underpaid Procedures</h4>
            {underpaidProcedures.length > 0 ? (
              underpaidProcedures.map((procedure: any, index: number) => (
                <div key={index} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{procedure.code} - {procedure.description}</div>
                      <div className="text-sm text-gray-600">{procedure.date}</div>
                    </div>
                    <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                      UNDERPAID
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Submitted:</span> ${procedure.submitted_amount.toFixed(2)}</div>
                    <div><span className="font-medium">Patient Responsibility:</span> ${procedure.patient_responsibility.toFixed(2)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <p>No underpaid procedures found</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderReconciliationResults = () => {
    if (!reconciliationResults) return null;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          Reconciliation Results
        </h3>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'summary', label: 'Summary', icon: FileText },
            { id: 'patient', label: 'Patient', icon: User },
            { id: 'voc', label: 'VOC', icon: Shield },
            { id: 'procedures', label: 'Procedures', icon: CheckCircle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setReconciliationTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                reconciliationTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {reconciliationTab === 'summary' && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Reconciliation Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Patient Matched:</span>
                    <span className="text-green-600 font-medium">✓ Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Procedures Matched:</span>
                    <span className="text-green-600 font-medium">{reconciliationResults.procedures_info.found_procedures}/{reconciliationResults.procedures_info.total_procedures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coverage Verified:</span>
                    <span className="text-green-600 font-medium">✓ Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Issues Found:</span>
                    <span className="text-red-600 font-medium">{reconciliationResults.reconciliation_summary.issues_found}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-3">Revenue Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Denied Amount:</span>
                    <span className="text-red-600 font-medium">${reconciliationResults.comparison_results.revenue_impact.denied_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Underpaid Amount:</span>
                    <span className="text-red-600 font-medium">${reconciliationResults.comparison_results.revenue_impact.underpaid_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total Impact:</span>
                    <span className="text-red-600">${reconciliationResults.comparison_results.revenue_impact.total_impact.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
              <div className="space-y-3">
                {reconciliationResults.insights.map((insight: string, index: number) => {
                  let insightStyle = {};
                  let icon = '💡';
                  
                  if (insight.toLowerCase().includes('denied') || insight.toLowerCase().includes('denial')) {
                    insightStyle = {
                      background: 'linear-gradient(135deg, #ffebee, #ffcdd2)',
                      border: '1px solid #ef5350',
                      color: '#c62828'
                    };
                    icon = '⚠️';
                  } else if (insight.toLowerCase().includes('matched') || insight.toLowerCase().includes('successfully')) {
                    insightStyle = {
                      background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                      border: '1px solid #4caf50',
                      color: '#2e7d32'
                    };
                    icon = '✅';
                  } else if (insight.toLowerCase().includes('recommend') || insight.toLowerCase().includes('submit')) {
                    insightStyle = {
                      background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                      border: '1px solid #ff9800',
                      color: '#e65100'
                    };
                    icon = '⚠️';
                  } else {
                    insightStyle = {
                      background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                      border: '1px solid #2196f3',
                      color: '#1565c0'
                    };
                    icon = '✅';
                  }
                  
                  return (
                    <div key={index} style={{ 
                      padding: 12, 
                      borderRadius: 8, 
                      fontSize: 14, 
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      ...insightStyle
                    }}>
                      <span style={{ fontSize: 18 }}>{icon}</span>
                      <span>{insight}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Recommended Next Steps</h4>
              <div className="space-y-2">
                {reconciliationResults.next_steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {reconciliationTab === 'patient' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Patient Information</h4>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Name:</span> {reconciliationResults.patient_info.name}</div>
                <div><span className="font-medium">Patient ID:</span> {reconciliationResults.patient_info.id}</div>
                <div><span className="font-medium">DOB:</span> {reconciliationResults.patient_info.dob}</div>
                <div><span className="font-medium">Phone:</span> {reconciliationResults.patient_info.phone}</div>
                <div><span className="font-medium">Email:</span> {reconciliationResults.patient_info.email}</div>
                <div><span className="font-medium">Match Confidence:</span> {reconciliationResults.patient_info.match_confidence * 100}%</div>
              </div>
              <div className="mt-4">
                <span className="font-medium">Address:</span> {reconciliationResults.patient_info.address}
              </div>
            </div>
          </div>
        )}

        {reconciliationTab === 'voc' && (
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4">Verification of Coverage</h4>
            
            {/* Deductible */}
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-3">Deductible Status</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Individual:</span> ${reconciliationResults.voc_data.deductible.met_individual.toFixed(2)} of ${reconciliationResults.voc_data.deductible.individual.toFixed(2)} met
                </div>
                <div>
                  <span className="font-medium">Family:</span> ${reconciliationResults.voc_data.deductible.met_family.toFixed(2)} of ${reconciliationResults.voc_data.deductible.family.toFixed(2)} met
                </div>
              </div>
            </div>

            {/* Annual Maximum */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold text-blue-900 mb-3">Annual Maximum</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Individual:</span> ${reconciliationResults.voc_data.annual_maximum.used_individual.toFixed(2)} of ${reconciliationResults.voc_data.annual_maximum.individual.toFixed(2)} used
                </div>
                <div>
                  <span className="font-medium">Family:</span> ${reconciliationResults.voc_data.annual_maximum.used_family.toFixed(2)} of ${reconciliationResults.voc_data.annual_maximum.family.toFixed(2)} used
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Procedure Coverage</h5>
              <div className="space-y-3">
                {Object.entries(reconciliationResults.voc_data.coverage_details).map(([code, details]: [string, any]) => {
                  // Map procedure codes to descriptions
                  const procedureDescriptions: { [key: string]: string } = {
                    "9210": "Periodic Oral Evaluation",
                    "2330": "Crown - Porcelain/Ceramic",
                    "4910": "Periodontal Maintenance"
                  };
                  
                  return (
                    <div key={code} className="border border-gray-200 rounded-lg p-3">
                      <div className="font-medium text-gray-900 mb-2">
                        Code {code} - {procedureDescriptions[code] || "Unknown Procedure"}
                      </div>
                      <div className="grid md:grid-cols-3 gap-2 text-sm">
                        <div><span className="font-medium">Coverage:</span> {details.coverage}%</div>
                        <div><span className="font-medium">Frequency:</span> {details.frequency}</div>
                        <div><span className="font-medium">Limitations:</span> {details.limitations}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {reconciliationTab === 'procedures' && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Procedure Matching</h4>
            <div className="space-y-3">
              {reconciliationResults.procedures_info.procedures.map((procedure: any, index: number) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  procedure.status === 'matched' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-gray-900">{procedure.code} - {procedure.description}</div>
                      <div className="text-sm text-gray-600">{procedure.date}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      procedure.status === 'matched' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {procedure.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Claim ID:</span> {procedure.claim_id || 'Not found'}</div>
                    <div><span className="font-medium">EOB Allowed:</span> ${procedure.eob_allowed?.toFixed(2) || 'N/A'}</div>
                    {procedure.submitted_amount && (
                      <div><span className="font-medium">Submitted Amount:</span> ${procedure.submitted_amount.toFixed(2)}</div>
                    )}
                    {procedure.difference !== null && (
                      <div><span className="font-medium">Difference:</span> ${procedure.difference.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
          <CheckCircle className="h-5 w-5" />
          <span className="font-semibold">Simulating AI-powered EOB processing for patient John Wright</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: EOB Document & Processing */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              EOB Document Being Processed
            </h4>
            
            {/* EOB Image Display */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-center mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Sample EOB Document</h5>
                  <p className="text-sm text-gray-600">Delta Dental EOB for John Wright</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-300 shadow-sm">
                  <img 
                    src="/eob-demo.png" 
                    alt="EOB Document" 
                    className="max-w-full h-auto rounded border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ maxHeight: '300px' }}
                    onClick={() => setShowEOBModal(true)}
                  />
                  <div className="text-center text-gray-500 text-sm mt-2">
                    <p>Delta Dental Sample EOB - Click to enlarge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Controls */}
            {!isPlaying && !results && (
              <div className="text-center mb-6">
                <button
                  onClick={startDemo}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
                >
                  <Play className="h-5 w-5" />
                  Start EOB Processing Demo
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Watch AI process the EOB and perform reconciliation
                </p>
              </div>
            )}

            {isLoading && (
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {reconciliationStep === 'extract' ? 'Processing EOB with AI...' : 'Reconciling with VOC & Claims...'}
                </div>
              </div>
            )}

            {/* EOB Summary */}
            {results && renderEOBSummary()}

            {/* Reconcile Button */}
            {results && reconciliationStep === 'extract' && (
              <div className="text-center mt-6">
                <button
                  onClick={handleReconcile}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Reconciling...' : 'Reconcile with VOC & Claims'}
                </button>
              </div>
            )}

            {/* Reset Demo Button */}
            {results && (
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setResults(null);
                    setReconciliationResults(null);
                    setReconciliationStep('extract');
                    setIsPlaying(false);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset Demo
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Reconciliation Results */}
        <div className="lg:col-span-1">
          {results && reconciliationStep === 'reconcile' && reconciliationResults ? (
            <div>
              {renderReconciliationResults()}
              {/* Reset Demo Button */}
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setResults(null);
                    setReconciliationResults(null);
                    setReconciliationStep('extract');
                    setIsPlaying(false);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset Demo
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Ready for Reconciliation</h4>
              <p className="text-sm text-gray-600">
                Process the EOB first, then click "Reconcile" to see the results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* EOB Modal */}
      {showEOBModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowEOBModal(false)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Delta Dental Sample EOB</h3>
              <button
                onClick={() => setShowEOBModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <img 
                src="/eob-demo.png" 
                alt="EOB Document" 
                className="max-w-full h-auto rounded border border-gray-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EOBDemoProcessor; 