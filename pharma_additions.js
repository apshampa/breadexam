// High-Yield Clinical Indications & Mechanisms of Action for Pharma-Pulse

const DRUG_USES_DATA = {
  1: [
    {
      drug: "Phenytoin",
      class: "Hydantoin Antiepileptic / Class Ib Antiarrhythmic",
      uses: "• Status Epilepticus (2nd-line IV maintenance after Lorazepam)\n• Generalized Tonic-Clonic (Grand Mal) & Focal Seizures\n• Trigeminal Neuralgia (2nd-line)\n• Digitalis-induced ventricular tachyarrhythmias (membrane-stabilizing Ib)",
      pearl: "Exhibits zero-order (saturation) kinetics within therapeutic range (10-20 mcg/mL); gingival hyperplasia, hirsutism, fetal hydantoin syndrome."
    },
    {
      drug: "Rifampicin",
      class: "Rifamycin Antimycobacterial / RNA Polymerase Inhibitor",
      uses: "• Pulmonary & Extrapulmonary Tuberculosis (1st-line core bactericidal)\n• Leprosy (WHO Multi-Drug Therapy combined with Dapsone & Clofazimine)\n• Chemoprophylaxis for close contacts of Meningococcal & H. influenzae meningitis\n• Prosthetic valve MRSA/MRSE endocarditis (penetrates staphylococcal biofilms)",
      pearl: "Potent hepatic CYP3A4 inducer; imparts harmless red-orange discoloration to urine, sweat, saliva, and contact lenses."
    },
    {
      drug: "Ketoconazole",
      class: "Imidazole Antifungal / Steroidogenesis Inhibitor",
      uses: "• Mucocutaneous fungal infections (topical shampoos for seborrheic dermatitis & tinea versicolor)\n• Cushing's Syndrome / Hypercortisolemia (off-label inhibition of adrenal CYP11A1 & CYP11B1)\n• Advanced androgen-dependent Prostate Cancer (adrenal androgen suppression)",
      pearl: "Potent CYP3A4 inhibitor; causes gynecomastia and decreased libido in men via inhibition of testicular 17,20-lyase."
    },
    {
      drug: "Aspirin (Acetylsalicylic Acid)",
      class: "Irreversible Cyclooxygenase (COX-1 / COX-2) Inhibitor",
      uses: "• Secondary prophylaxis of Myocardial Infarction & Ischemic Stroke (75-150 mg/day antiplatelet)\n• Acute Coronary Syndromes (chewable 300 mg loading dose)\n• Inflammatory arthritis & Rheumatic Fever (high anti-inflammatory dose 3-5 g/day)\n• Kawasaki Disease in children (prevents coronary artery aneurysms - sole pediatric indication)\n• Pre-eclampsia prophylaxis in high-risk pregnant women (low-dose from 12 weeks)",
      pearl: "Irreversibly acetylates Serine 529 on platelet COX-1 for the 7-10 day platelet lifespan; causes Reye's syndrome in children with viral illness."
    },
    {
      drug: "Ethanol",
      class: "Alcohol Dehydrogenase Substrate",
      uses: "• Emergency Antidote for Toxic Alcohol Poisoning (Methanol and Ethylene Glycol ingestion)",
      pearl: "Has 100x higher affinity for Alcohol Dehydrogenase than methanol, preventing toxic formic acid (blindness) and oxalic acid (renal failure) formation."
    }
  ],
  2: [
    {
      drug: "Pilocarpine",
      class: "Direct Muscarinic (M3) Cholinomimetic Alkaloid",
      uses: "• Chronic Open-Angle Glaucoma (contracts ciliary muscle, stretches trabecular meshwork to increase drainage)\n• Acute Angle-Closure Glaucoma (emergency rapid pupillary constriction pulls peripheral iris away from trabecular meshwork)\n• Severe Xerostomia (dry mouth in Sjögren's syndrome or post-radiotherapy)",
      pearl: "Tertiary amine; stimulates diaphoresis (sweating test in cystic fibrosis) and salivation."
    },
    {
      drug: "Bethanechol",
      class: "Synthetic Muscarinic Ester (Selective M3)",
      uses: "• Postoperative non-obstructive Urinary Retention\n• Postpartum urinary atony\n• Diabetic neurogenic bladder with detrusor hypocontractility\n• Paralytic ileus / gastrointestinal atony",
      pearl: "Quaternary amine completely devoid of nicotinic activity; does not cause bronchoconstriction or cardiac arrest at standard doses."
    },
    {
      drug: "Pyridostigmine",
      class: "Reversible Carbamate Anticholinesterase (AChEI)",
      uses: "• Drug of Choice for chronic oral maintenance therapy in Myasthenia Gravis\n• Prophylaxis against chemical nerve agent (Soman) soman exposure in military personnel",
      pearl: "Quaternary amine with 3-6 hour duration (longer than neostigmine) and smoother motor control with fewer muscarinic visceral spasms."
    },
    {
      drug: "Neostigmine",
      class: "Quaternary Anticholinesterase & Direct NMJ Stimulant",
      uses: "• Reversal of Non-Depolarizing Neuromuscular Blockade (Curare, Vecuronium, Rocuronium) at end of anesthesia\n• Acute Colonic Pseudo-Obstruction (Ogilvie's Syndrome)\n• Treatment of acute Myasthenic Crisis (IM/IV)",
      pearl: "Always co-administered with Glycopyrrolate or Atropine to prevent severe reflex muscarinic bradycardia, bronchospasm, and salivation."
    },
    {
      drug: "Physostigmine",
      class: "Tertiary Amine Reversible Anticholinesterase",
      uses: "• Specific life-saving Antidote for severe central & peripheral Anticholinergic Toxicity (Atropine, Belladonna, Datura, TCAs, Antihistamines)",
      pearl: "Being an uncharged tertiary amine, it crosses the blood-brain barrier to rapidly reverse central delirium, hallucinations, and coma."
    },
    {
      drug: "Atropine",
      class: "Prototypical Non-Selective Muscarinic Antagonist",
      uses: "• Hemodynamically unstable Sinus Bradycardia & AV Block (ACLS first-line 0.5-1.0 mg IV)\n• Specific life-saving Antidote for Organophosphate and Carbamate insecticide poisoning (titrated till secretions dry)\n• Pre-anesthetic medication (dries airway secretions, prevents vagal reflex arrest during intubation)\n• Cycloplegic refraction and treatment of Anterior Uveitis/Iritis (prevents posterior synechiae)",
      pearl: "Classic Belladonna toxicity mnemonic: 'Blind as a bat, dry as a bone, red as a beet, hot as a hare, mad as a hatter, full as a flask'."
    },
    {
      drug: "Pralidoxime (2-PAM)",
      class: "Cholinesterase Reactivator (Nucleophilic Oxime)",
      uses: "• Specific Antidote for Organophosphate Anticholinesterase Poisoning (must be given before enzyme aging occurs)",
      pearl: "Displaces the alkylphosphate moiety from the anionic/esteratic site of acetylcholinesterase; completely ineffective in Carbamate poisoning."
    }
  ],
  3: [
    {
      drug: "Adrenaline (Epinephrine)",
      class: "Direct Non-Selective Sympathomimetic (α1, α2, β1, β2)",
      uses: "• First-line Drug of Choice for Anaphylactic Shock (0.5 mL 1:1000 IM in anterolateral thigh)\n• ACLS Cardiopulmonary Resuscitation in Cardiac Arrest (Asystole, PEA, VF/pVT 1 mg IV every 3-5 min)\n• Open-angle glaucoma (dipivefrin prodrug)\n• Adjuvant with Local Anesthetics (1:200,000) to prolong block duration and prevent systemic toxicity\n• Acute severe Bronchospasm refractory to nebulization",
      pearl: "Produces Dale's Vasomotor Reversal when administered after alpha-blockade (unmasks pure β2 vasodilation, causing BP to drop instead of rise)."
    },
    {
      drug: "Noradrenaline (Norepinephrine)",
      class: "Potent α1, α2, β1 Sympathomimetic (Minimal β2)",
      uses: "• Drug of Choice for Septic Shock, Neurogenic Shock, and Vasodilatory Shock refractory to fluid resuscitation",
      pearl: "Produces intense systemic vasoconstriction with reflex bradycardia; does not cause Dale's vasomotor reversal because it lacks β2 vasodilator activity."
    },
    {
      drug: "Dobutamine",
      class: "Selective β1 Adrenergic Agonist (Mild β2 vasodilation)",
      uses: "• Acute Decompensated Heart Failure with low cardiac output\n• Cardiogenic Shock without severe hypotension\n• Pharmacological Stress Echocardiography (in patients unable to exercise)",
      pearl: "Increases myocardial inotropy (contractility) significantly more than chronotropy (heart rate) while mildly decreasing afterload."
    },
    {
      drug: "Prazosin & Doxazosin",
      class: "Selective Peripheral α1-Adrenergic Antagonists",
      uses: "• Essential Hypertension\n• Benign Prostatic Hyperplasia (BPH - relieves urinary hesitancy and frequency)\n• Raynaud's Phenomenon\n• PTSD-associated Sleep Impairment and Night Terrors (central α1 blockade)",
      pearl: "Prone to first-dose postural hypotension and syncope; instruct patient to take first dose at bedtime."
    },
    {
      drug: "Tamsulosin",
      class: "Uroselective α1A / α1D Adrenoceptor Antagonist",
      uses: "• Benign Prostatic Hyperplasia (BPH) - first-line medical therapy\n• Facilitation of spontaneous passage of lower ureteric renal stones (<10 mm)",
      pearl: "Selectively targets α1A receptors in bladder neck and prostate; does NOT lower systemic blood pressure or cause postural hypotension; can cause Intraoperative Floppy Iris Syndrome (IFIS) during cataract surgery."
    },
    {
      drug: "Phenoxybenzamine",
      class: "Non-Selective Irreversible Covalent α-Blocker",
      uses: "• Pre-operative preparation for surgical resection of Pheochromocytoma (blocks α-receptors before tumor manipulation)\n• Long-term medical management of inoperable metastatic pheochromocytoma",
      pearl: "MUST be administered before beta-blockers in pheochromocytoma to prevent fatal hypertensive crisis from unopposed alpha-1 vasoconstriction."
    },
    {
      drug: "Propranolol",
      class: "Non-Selective Beta-Blocker (β1 + β2) with Membrane Stabilizing Activity",
      uses: "• Essential Hypertension, Angina Pectoris, Post-MI cardioprotection\n• Symptomatic control of Thyrotoxicosis / Thyroid Storm (controls tachycardia, tremor, and inhibits peripheral T4 to T3 conversion)\n• Essential Familial Tremor & Performance Anxiety (stage fright)\n• Migraine Headache Prophylaxis\n• Prevention of variceal hemorrhage in Cirrhosis (splanchnic vasoconstriction)",
      pearl: "Strictly contraindicated in Bronchial Asthma and COPD (blocks β2 bronchodilation, precipitating fatal bronchospasm)."
    },
    {
      drug: "Latanoprost & Bimatoprost",
      class: "Prostaglandin F2α (PGF2α) Analog",
      uses: "• First-line Drug of Choice for Chronic Open-Angle Glaucoma and Ocular Hypertension",
      pearl: "Increases uveoscleral outflow of aqueous humor; once-daily evening dosing; causes permanent hyperpigmentation of the iris (brown discoloration) and lengthening of eyelashes."
    }
  ],
  4: [
    {
      drug: "Enalapril & Ramipril",
      class: "Angiotensin Converting Enzyme (ACE) Inhibitors",
      uses: "• Essential & Renovascular Hypertension\n• Heart Failure with Reduced Ejection Fraction (HFrEF - proven mortality reduction)\n• Diabetic Nephropathy & CKD with proteinuria (dilates efferent arteriole, reduces intraglomerular hyperfiltration)\n• Post-Myocardial Infarction secondary prevention (prevents LV remodeling)",
      pearl: "Inhibits Kininase II (ACE), causing pulmonary bradykinin accumulation that triggers dry hacking cough (~15%) and angioedema. Strictly contraindicated in pregnancy (fetal renal agenesis) and bilateral renal artery stenosis."
    },
    {
      drug: "Losartan & Telmisartan",
      class: "Angiotensin II Receptor Blockers (ARBs - AT1 Selective)",
      uses: "• Hypertension & Diabetic Nephropathy in patients intolerant of ACE inhibitors due to dry cough or angioedema",
      pearl: "Does NOT increase bradykinin levels (no dry cough); Telmisartan uniquely activates PPAR-gamma, conferring metabolic benefits in insulin-resistant patients."
    },
    {
      drug: "Amlodipine",
      class: "Dihydropyridine Calcium Channel Blocker (L-type)",
      uses: "• Essential Hypertension (especially elderly and isolated systolic HTN)\n• Chronic Stable Exertional Angina Pectoris\n• Vasospastic (Prinzmetal's / Variant) Angina\n• Raynaud's Phenomenon",
      pearl: "Causes dependent ankle / pretibial edema due to selective precapillary arteriolar dilation without postcapillary venodilation (not fluid retention; relieved by adding ACEi)."
    },
    {
      drug: "Nitroglycerin (Glyceryl Trinitrate)",
      class: "Organic Nitrate Prodrug / Nitric Oxide Donor",
      uses: "• Immediate emergency termination of Acute Anginal Attack (0.4-0.6 mg sublingual)\n• Angina Prophylaxis (oral sustained-release or transdermal patch with nitrate-free interval)\n• Acute Pulmonary Edema in Acute Heart Failure\n• Hypertensive Emergencies",
      pearl: "Venodilation reduces venous return (preload) and myocardial wall tension; strictly contraindicated with Sildenafil (PDE-5 inhibitor) due to catastrophic refractory hypotension and cardiac arrest."
    },
    {
      drug: "Ranolazine",
      class: "Late Inward Sodium Current (late INa) Inhibitor",
      uses: "• Chronic refractory Angina Pectoris (adjunct to beta-blockers, CCBs, or nitrates)",
      pearl: "Reduces diastolic intracellular sodium overload and secondary calcium overload in ischemic myocardium; does NOT alter heart rate or blood pressure."
    },
    {
      drug: "Ivabradine",
      class: "Hyperpolarization-Activated Funny Current (If) Blocker",
      uses: "• Chronic Stable Angina and HFrEF with sinus rhythm ≥70 bpm despite maximum beta-blockade",
      pearl: "Selectively slows SA nodal pacemaker discharge without depressing myocardial contractility, AV conduction, or systemic blood pressure; classic side effect is visual phosphenes (luminous optical phenomena)."
    }
  ],
  5: [
    {
      drug: "Digoxin",
      class: "Cardiac Glycoside (Na+/K+ ATPase Inhibitor)",
      uses: "• Heart Failure with Reduced Ejection Fraction (HFrEF NYHA III/IV for symptom relief and reduced hospitalizations)\n• Rate control in chronic Atrial Fibrillation with coexisting heart failure",
      pearl: "Inhibits myocardial Na+/K+ ATPase, increasing intracellular Na+ and reversing Na+/Ca2+ exchanger (positive inotropy) while increasing vagal tone to AV node. Hypokalemia dramatically potentiates toxicity; classic symptom is xanthopsia (yellow-green vision); antidote: DigiFab."
    },
    {
      drug: "Sacubitril / Valsartan (ARNI)",
      class: "Neprilysin Inhibitor + Angiotensin Receptor Blocker",
      uses: "• First-line cornerstone therapy for HFrEF (NYHA class II-IV) replacing ACEi/ARB to reduce cardiovascular death and hospitalizations",
      pearl: "Sacubitril inhibits Neprilysin, preventing degradation of beneficial natriuretic peptides (ANP, BNP) and bradykinin; requires a 36-hour washout period when switching from an ACEi to avoid severe angioedema."
    },
    {
      drug: "Furosemide (Lasix)",
      class: "High-Ceiling Loop Diuretic (Na+-K+-2Cl- Inhibitor)",
      uses: "• Acute Pulmonary Edema (IV - rapid venodilation precedes diuresis)\n• Congestive Heart Failure fluid congestion & peripheral edema\n• Hepatic Cirrhosis Ascites and Nephrotic Syndrome\n• Acute severe Hypercalcemia (promotes calciuria: 'Loops Lose Calcium')\n• Forced diuresis in intoxications",
      pearl: "Acts on Na+-K+-2Cl- symporter in the Thick Ascending Limb of Henle; causes hypokalemia, hypocalcemia, hypomagnesemic metabolic alkalosis, hyperuricemia, and dose-dependent ototoxicity."
    },
    {
      drug: "Hydrochlorothiazide & Chlorthalidone",
      class: "Thiazide / Thiazide-Like Diuretic (Na+-Cl- Inhibitor)",
      uses: "• First-line therapy for Essential Hypertension\n• Mild-to-moderate chronic heart failure edema\n• Prevention of recurrent Calcium Oxalate Nephrolithiasis (reduces hypercalciuria: 'Thiazides Take Calcium')\n• Nephrogenic Diabetes Insipidus (paradoxical antidiuretic effect)",
      pearl: "Acts on Na+-Cl- symporter in the Distal Convoluted Tubule; causes hypokalemic metabolic alkalosis, hypercalcemia, hyperuricemia (precipitates gout), and hyperglycemia."
    },
    {
      drug: "Spironolactone & Eplerenone",
      class: "Mineralocorticoid / Aldosterone Receptor Antagonists (MRA)",
      uses: "• HFrEF (LVEF ≤35% - reduces cardiac fibrosis and all-cause mortality by ~30%)\n• Resistant Hypertension\n• Primary Hyperaldosteronism (Conn's Syndrome)\n• Cirrhotic Ascites (Drug of Choice - reverses hyperaldosteronism)\n• Female Hirsutism and Polycystic Ovary Syndrome (Spironolactone)",
      pearl: "Potassium-sparing diuretic acting on collecting tubules; causes hyperkalemia; Spironolactone causes gynecomastia and menstrual irregularities due to androgen receptor antagonism (Eplerenone is selective without gynecomastia)."
    },
    {
      drug: "Amiodarone",
      class: "Class III Antiarrhythmic (Multi-channel blocker: K+, Na+, Ca2+, β)",
      uses: "• Life-threatening Ventricular Tachycardia (VT) and Ventricular Fibrillation (VF) in cardiac arrest (ACLS 300 mg IV)\n• Maintenance of Sinus Rhythm in Atrial Fibrillation / Flutter\n• Antiarrhythmic of choice in patients with structural heart disease or low LVEF",
      pearl: "Contains 37% iodine by weight; half-life ~58 days; causes pulmonary fibrosis, hypo/hyperthyroidism, corneal microdeposits, blue-gray skin discoloration, and hepatotoxicity."
    },
    {
      drug: "Adenosine",
      class: "Purinergic P1 (A1) Receptor Agonist",
      uses: "• Drug of Choice for acute emergency conversion of Paroxysmal Supraventricular Tachycardia (PSVT) to sinus rhythm",
      pearl: "Ultra-short half-life (<10 seconds); administered as rapid IV bolus followed by immediate saline flush; acts via A1 receptors in AV node causing hyperpolarization and transient complete AV block."
    }
  ],
  6: [
    {
      drug: "Lorazepam & Diazepam",
      class: "Benzodiazepine (GABA-A Positive Allosteric Modulator)",
      uses: "• First-line Drug of Choice for immediate termination of Status Epilepticus (IV Lorazepam 0.1 mg/kg or Diazepam 10 mg)\n• Acute Panic Attacks and Generalized Anxiety Disorder (GAD)\n• Acute Alcohol Withdrawal Delirium Tremens\n• Pre-anesthetic conscious sedation and procedural anxiolysis\n• Acute Skeletal Muscle Spasm / Tetanus rigidity",
      pearl: "Increases the FREQUENCY of GABA-A chloride channel opening; has a ceiling effect (much safer than barbiturates); antidote is IV Flumazenil."
    },
    {
      drug: "Phenytoin & Fosphenytoin",
      class: "Voltage-Gated Sodium Channel Blocker (Use-Dependent)",
      uses: "• Generalized Tonic-Clonic (Grand Mal) Seizures\n• Focal (Partial) Seizures\n• Status Epilepticus (2nd-line IV maintenance after BZDs - Fosphenytoin is preferred water-soluble prodrug)\n• Prevention of post-traumatic and neurosurgical seizures",
      pearl: "Saturation (zero-order) kinetics; causes gingival hyperplasia (PDGF-mediated), coarse facial features, hirsutism, peripheral neuropathy, and teratogenic Fetal Hydantoin Syndrome."
    },
    {
      drug: "Carbamazepine",
      class: "Iminostilbene Voltage-Gated Na+ Channel Blocker",
      uses: "• First-line Drug of Choice for Trigeminal Neuralgia (tic douloureux)\n• Focal (Partial) Seizures with or without secondary generalization\n• Generalized Tonic-Clonic Seizures\n• Bipolar Disorder acute mania and maintenance (2nd-line)",
      pearl: "Autoinduces its own hepatic CYP3A4 metabolism; can cause SIADH (hyponatremia), aplastic anemia, agranulocytosis, and Stevens-Johnson Syndrome (HLA-B*1502 screening in Asians)."
    },
    {
      drug: "Sodium Valproate",
      class: "Broad-Spectrum Antiepileptic (Na+ block, T-Ca2+ block, GABA-T inh)",
      uses: "• Broad-spectrum Drug of Choice for Idiopathic Generalized Epilepsies (Tonic-Clonic, Absence, Myoclonic)\n• Juvenile Myoclonic Epilepsy (JME - lifelong treatment)\n• Acute Bipolar Mania & Prophylaxis\n• Migraine Headache Prophylaxis",
      pearl: "Potent hepatic microsomal enzyme inhibitor; high teratogenic risk of Neural Tube Defects (Spina Bifida 1-2%); causes weight gain, alopecia, hepatotoxicity, and acute pancreatitis."
    },
    {
      drug: "Ethosuximide",
      class: "T-Type Calcium Channel Blocker (Thalamic Pacemaker)",
      uses: "• Pure first-line Drug of Choice for Absence (Petit Mal) Seizures in pediatric patients",
      pearl: "Selectively blocks low-threshold T-type Ca2+ currents in thalamic relay neurons responsible for 3-Hz spike-and-wave discharges on EEG; completely ineffective against generalized tonic-clonic seizures."
    },
    {
      drug: "Levodopa + Carbidopa",
      class: "Dopamine Precursor + Peripheral Dopa Decarboxylase Inhibitor",
      uses: "• Gold standard first-line symptomatic medical therapy for Parkinson's Disease (idiopathic parkinsonism)",
      pearl: "Carbidopa does NOT cross the blood-brain barrier; by inhibiting peripheral decarboxylation, it increases central levodopa availability from 1% to 10% and dramatically reduces peripheral dopamine nausea and arrhythmias."
    },
    {
      drug: "Trihexyphenidyl (Benzhexol)",
      class: "Centrally Acting Anticholinergic (Antimuscarinic)",
      uses: "• Drug of Choice for Drug-Induced Parkinsonism and Acute Dystonic Reactions caused by typical antipsychotics",
      pearl: "Restores the dopamine-acetylcholine balance in the striatum; especially effective for resting tremor and rigidity."
    }
  ],
  7: [
    {
      drug: "Morphine",
      class: "Prototypic Pure Opioid (μ-Opioid Receptor Agonist)",
      uses: "• Severe Acute and Chronic Pain (major surgery, advanced cancer, severe trauma, palliative care)\n• Acute Myocardial Infarction (relieves excruciating chest pain, reduces sympathetic drive, venodilates to relieve acute pulmonary edema)\n• Pre-operative sedation and balanced anesthesia",
      pearl: "Strictly contraindicated in Head Injury (respiratory depression causes CO2 retention -> cerebral vasodilation -> raised ICP risking fatal brain herniation), Bronchial Asthma, and Biliary Colic (sphincter of Oddi spasm)."
    },
    {
      drug: "Naloxone (Narcan)",
      class: "Pure Competitive Opioid Receptor Antagonist",
      uses: "• Specific life-saving Antidote for Acute Opioid Overdose triad (Coma, Pinpoint Pupils, Respiratory Depression)",
      pearl: "Rapidly reverses respiratory arrest within 1-2 minutes; short half-life (30-60 min) means repeat doses or infusion are required for long-acting opioids like Methadone."
    },
    {
      drug: "Paracetamol (Acetaminophen)",
      class: "Centrally Acting COX-3 / Peroxidase Inhibitor",
      uses: "• First-line Antipyretic and Analgesic for mild-to-moderate pain (headache, musculoskeletal pain, osteoarthritis)\n• Antipyretic of choice in children (no risk of Reye's syndrome) and throughout all trimesters of pregnancy",
      pearl: "Lacks peripheral anti-inflammatory and antiplatelet activity; toxicity antidote is N-Acetylcysteine (NAC) within 8-10 hours to replenish hepatic glutathione."
    },
    {
      drug: "Allopurinol & Febuxostat",
      class: "Xanthine Oxidase Inhibitors (Hypouricemic Agents)",
      uses: "• First-line chronic maintenance therapy for Chronic Gout and Hyperuricemia\n• Prevention of Tumor Lysis Syndrome and acute urate nephropathy during chemotherapy of hematologic malignancies",
      pearl: "Must NEVER be initiated during an acute gout flare (rapid uric acid drop mobilizes articular tophi and worsens attack); screen for HLA-B*5801 for fatal SCAR / Stevens-Johnson syndrome."
    },
    {
      drug: "Colchicine",
      class: "Microtubule Disassembly Inhibitor (Tubulin Binding)",
      uses: "• Acute flare of Gouty Arthritis (most effective when started within 12-24 hours)\n• Prophylaxis against recurrent flares when initiating urate-lowering therapy\n• Familial Mediterranean Fever (FMF)\n• Acute and recurrent Pericarditis",
      pearl: "Binds tubulin to inhibit microtubule assembly, halting neutrophil chemotaxis, motility, and degranulation at the inflamed joint; causes dose-limiting diarrhea."
    },
    {
      drug: "Clozapine",
      class: "Second-Generation Atypical Antipsychotic (5-HT2A / D4 / D2)",
      uses: "• Gold standard Drug of Choice for Treatment-Resistant Schizophrenia\n• Severe persistent suicidal behavior in schizophrenia or schizoaffective disorder",
      pearl: "Lacks extrapyramidal symptoms (EPS) and does not elevate prolactin; carries a 1-2% risk of fatal Agranulocytosis, mandating baseline and weekly Absolute Neutrophil Count (ANC) monitoring."
    }
  ],
  8: [
    {
      drug: "Benzathine Penicillin G",
      class: "Repository Long-Acting Depot Beta-Lactam Penicillin",
      uses: "• Drug of Choice for Syphilis (Treponema pallidum - single IM injection for primary/secondary; 3 weekly injections for late latent)\n• Secondary Prophylaxis of Rheumatic Fever (1.2 million units IM every 3-4 weeks for 5-10 years or life)",
      pearl: "Maintains prolonged low treponemicidal blood concentrations for 3-4 weeks; watch for Jarisch-Herxheimer reaction within 2-12 hours of starting therapy."
    },
    {
      drug: "Amoxicillin + Clavulanic Acid (Augmentin)",
      class: "Aminopenicillin + Suicide Beta-Lactamase Inhibitor",
      uses: "• Acute Otitis Media, Sinusitis, and Community-Acquired Respiratory Infections\n• Animal and Human Bite Wounds (Pasturella, Eikenella)\n• Recurrent Urinary Tract Infections & Gynecological Sepsis\n• Helicobacter pylori eradication regimens",
      pearl: "Clavulanic acid permanently binds bacterial beta-lactamase, shielding amoxicillin from enzymatic degradation and restoring broad-spectrum bactericidal activity."
    },
    {
      drug: "Ceftriaxone (3rd Generation Cephalosporin)",
      class: "Broad-Spectrum Cephalosporin with High CNS Penetration",
      uses: "• Empirical first-line for Acute Bacterial Meningitis (combined with Vancomycin)\n• Uncomplicated Gonococcal Urethritis/Cervicitis (single 500 mg IM dose)\n• Typhoid / Enteric Fever (Salmonella enterica)\n• Community-Acquired Pneumonia & Spontaneous Bacterial Peritonitis\n• Severe Lyme Neuroborreliosis",
      pearl: "Long half-life allows once-daily dosing; excreted via biliary tract (no dose adjustment required in renal failure); can cause biliary sludging (pseudolithiasis)."
    },
    {
      drug: "Vancomycin",
      class: "Glycopeptide Cell Wall Inhibitor (D-Ala-D-Ala Binder)",
      uses: "• First-line Drug of Choice for Methicillin-Resistant Staphylococcus aureus (MRSA) bacteremia, endocarditis, osteomyelitis, and pneumonia\n• Oral formulation for Clostridioides difficile Pseudomembranous Colitis\n• Synergistic with Gentamicin for Enterococcal and Streptococcal endocarditis",
      pearl: "Rapid IV infusion causes non-IgE mast cell degranulation with histamine release ('Red Man Syndrome'); prevented by slow infusion over >60 minutes."
    },
    {
      drug: "Gentamicin & Amikacin",
      class: "Aminoglycoside Protein Synthesis Inhibitor (30S Ribosome)",
      uses: "• Severe Gram-negative aerobic sepsis (Pseudomonas, Enterobacteriaceae, Klebsiella)\n• Synergistic with Penicillin/Ampicillin for Enterococcal and Viridans Streptococcal endocarditis\n• Plague (Yersinia pestis) and Tularemia (Francisella tularensis)",
      pearl: "Bactericidal with Concentration-Dependent Killing and Post-Antibiotic Effect (PAE), justifying once-daily high-dose dosing; nephrotoxic and irreversible ototoxic."
    },
    {
      drug: "Doxycycline",
      class: "Tetracycline Protein Synthesis Inhibitor (30S Ribosome)",
      uses: "• First-line Drug of Choice for Rickettsial Diseases (Rocky Mountain spotted fever, Typhus)\n• Early localized Lyme Disease (Borrelia burgdorferi erythema migrans)\n• Chlamydia trachomatis genital infections\n• Cholera (Vibrio cholerae)\n• Acne Vulgaris & Malaria Chemoprophylaxis",
      pearl: "Safest tetracycline in renal failure because it is excreted primarily via the bile/feces; chelates calcium, causing permanent teeth discoloration in children <8 years."
    },
    {
      drug: "Azithromycin",
      class: "Macrolide / Azalide Protein Synthesis Inhibitor (50S Ribosome)",
      uses: "• Community-Acquired Atypical Pneumonia (Mycoplasma, Chlamydia, Legionella)\n• Uncomplicated Chlamydia trachomatis urethritis/cervicitis (single 1g oral dose)\n• Enteric Typhoid Fever in fluoroquinolone-resistant strains\n• Pertussis (Whooping cough) treatment and contact prophylaxis\n• Mycobacterium avium complex (MAC) prophylaxis in HIV (CD4 <50)",
      pearl: "Long tissue half-life (~68 hours); minimal inhibition of hepatic CYP3A4 compared to erythromycin; carries a risk of QT prolongation and torsades de pointes."
    }
  ],
  9: [
    {
      drug: "Ciprofloxacin",
      class: "Fluoroquinolone DNA Synthesis Inhibitor (DNA Gyrase / Topo IV)",
      uses: "• Complicated Urinary Tract Infections and Acute Pyelonephritis\n• Bacterial Infectious Diarrhea (Shigella, Salmonella, Campylobacter, E. coli)\n• Cutaneous and Inhalational Anthrax (Bacillus anthracis treatment & post-exposure prophylaxis)\n• Chronic Bacterial Prostatitis",
      pearl: "Black-box warning for Tendinitis and Achilles Tendon Rupture; causes cartilage erosions in juvenile joints (avoid in children and pregnancy); prolongs QT interval."
    },
    {
      drug: "Isoniazid (INH)",
      class: "Antimycobacterial Mycolic Acid Synthesis Inhibitor (InhA)",
      uses: "• Cornerstone 1st-line bactericidal drug for Active Tuberculosis (HRZE 6-month regimen)\n• Monotherapy for Latent TB Infection (LTBI - 6-9 months daily with Pyridoxine)",
      pearl: "Prodrug activated by mycobacterial catalase-peroxidase (KatG); causes peripheral neuropathy due to Vitamin B6 deficiency (always co-prescribe Pyridoxine); hepatotoxic in slow acetylators."
    },
    {
      drug: "Pyrazinamide",
      class: "Antimycobacterial Fatty Acid Synthase-1 Inhibitor",
      uses: "• First-line Active Tuberculosis (part of 2-month intensive phase HRZE)",
      pearl: "Active only in acidic intracellular environments (inside macrophage phagolysosomes); sterilizing action enables short-course chemotherapy; causes hyperuricemia and acute gout flares."
    },
    {
      drug: "Ethambutol",
      class: "Antimycobacterial Arabinosyl Transferase Inhibitor (EmbB)",
      uses: "• First-line Active Tuberculosis (part of 2-month intensive phase HRZE)",
      pearl: "The ONLY bacteriostatic first-line anti-TB drug; prevents emergence of resistance; classic toxicity is dose-dependent retrobulbar optic neuritis presenting with red-green color blindness."
    },
    {
      drug: "Amphotericin B (Liposomal)",
      class: "Polyene Antifungal (Binds Ergosterol to Form Pores)",
      uses: "• Life-threatening Invasive Systemic Fungal Infections (Invasive Aspergillosis, Cryptococcal Meningitis induction with Flucytosine, Mucormycosis, Histoplasmosis)\n• Severe Visceral Leishmaniasis (Kala-Azar)",
      pearl: "Liposomal formulation sequesters drug into reticuloendothelial tissues, dramatically reducing renal tubular exposure and nephrotoxicity ('Ampho-terrible')."
    },
    {
      drug: "Fluconazole",
      class: "Triazole Antifungal (14α-Demethylase Inhibitor)",
      uses: "• Cryptococcal Meningitis consolidation and lifelong secondary prophylaxis\n• Oropharyngeal, Esophageal, and Vulvovaginal Candidiasis\n• Coccidioidal Meningitis (penetrates blood-brain barrier readily)",
      pearl: "High oral bioavailability with excellent cerebrospinal fluid penetration; inhibits fungal ergosterol synthesis; causes reversible alopecia and mild transaminitis."
    }
  ],
  10: [
    {
      drug: "Chloroquine",
      class: "4-Aminoquinoline Antimalarial (Heme Polymerase Inhibitor)",
      uses: "• Clinical attack of Plasmodium vivax, P. ovale, and P. malariae malaria\n• Extraintestinal Amebic Liver Abscess (concentrates 500x in hepatocytes)\n• Rheumatoid Arthritis and Systemic Lupus Erythematosus (mild antimalarial DMARD)",
      pearl: "Blocks biocrystallization of toxic heme into inert hemozoin in the parasite food vacuole; ineffective against chloroquine-resistant P. falciparum (PfCRT mutation); can cause irreversible retinopathy (bull's eye maculopathy)."
    },
    {
      drug: "Primaquine",
      class: "8-Aminoquinoline Antimalarial (Tissue Schizonticide)",
      uses: "• Radical Cure of Vivax and Ovale Malaria (eradicates dormant liver hypnozoites)\n• Gametocidal agent against P. falciparum (single dose halts community mosquito transmission)\n• Pneumocystis jirovecii pneumonia (combined with Clindamycin in sulfa allergy)",
      pearl: "The ONLY drug that kills dormant liver hypnozoites; mandatory G6PD enzyme testing required prior to therapy due to risk of life-threatening acute intravascular hemolysis."
    },
    {
      drug: "Artemether + Lumefantrine (ACT) & Artesunate",
      class: "Artemisinin-Based Combination Therapy (Endoperoxide Free Radical Generator)",
      uses: "• First-line treatment of choice for Uncomplicated Plasmodium falciparum Malaria\n• IV Artesunate is the worldwide Drug of Choice for Severe / Cerebral Malaria",
      pearl: "Cleaves intra-parasitic heme-iron endoperoxide bridges to release lethal free radicals; rapid parasite clearance within 24-48 hours; combined with Lumefantrine to prevent recrudescence."
    },
    {
      drug: "Unfractionated Heparin (UFH)",
      class: "Indirect Thrombin & Factor Xa Inhibitor (Antithrombin III Activator)",
      uses: "• Immediate anticoagulation for Acute Pulmonary Embolism (PE) & Deep Vein Thrombosis (DVT)\n• Acute Coronary Syndromes (STEMI / NSTEMI)\n• Anticoagulation during Cardiopulmonary Bypass surgery and Hemodialysis\n• Anticoagulation of choice in severe renal impairment (GFR <30)",
      pearl: "Accelerates Antithrombin III inhibition of factors IIa and Xa by 1,000-fold; monitored by aPTT (target 1.5-2.5x control); antidote is IV Protamine Sulfate."
    },
    {
      drug: "Enoxaparin (Low Molecular Weight Heparin - LMWH)",
      class: "Selective Factor Xa > IIa Inhibitor",
      uses: "• Treatment and postoperative prophylaxis of DVT and Pulmonary Embolism\n• Acute Coronary Syndromes (unstable angina, NSTEMI)\n• Safe long-term anticoagulation throughout pregnancy (does not cross placenta)",
      pearl: "Predictable bioavailability with subcutaneous once/twice daily dosing; does not require routine coagulation monitoring; lower risk of Heparin-Induced Thrombocytopenia (HIT)."
    },
    {
      drug: "Warfarin",
      class: "Vitamin K Epoxide Reductase (VKORC1) Competitive Antagonist",
      uses: "• Long-term prevention of systemic thromboembolism in Mechanical Heart Valves\n• Non-valvular Atrial Fibrillation with elevated CHA2DS2-VASc stroke score\n• Secondary prevention of recurrent DVT and Pulmonary Embolism",
      pearl: "Blocks gamma-carboxylation of clotting factors II, VII, IX, X, and natural anticoagulants Protein C and S; monitored by PT/INR (target 2.0-3.0); antidote is Vitamin K1 + 4-Factor PCC; strictly contraindicated in pregnancy (fetal warfarin syndrome / chondrodysplasia punctata)."
    },
    {
      drug: "Rivaroxaban & Apixaban",
      class: "Direct Oral Factor Xa Inhibitors (DOACs)",
      uses: "• Stroke prevention in Non-Valvular Atrial Fibrillation\n• Treatment and secondary prevention of DVT and PE\n• Post-arthroplasty venous thromboembolism prophylaxis",
      pearl: "Fixed oral dosing with zero routine coagulation monitoring; immediate onset of action; specific reversal agent is Andexanet alfa."
    },
    {
      drug: "Methotrexate",
      class: "Antifolate Antimetabolite (Dihydrofolate Reductase Inhibitor)",
      uses: "• First-line anchor Disease-Modifying Antirheumatic Drug (DMARD) for Rheumatoid Arthritis\n• Severe Psoriasis and Psoriatic Arthritis\n• Medical management of unruptured Ectopic Pregnancy\n• Gestational Trophoblastic Disease (Choriocarcinoma)\n• Acute Lymphoblastic Leukemia (ALL) and Osteosarcoma",
      pearl: "Competitively inhibits DHFR, starving cells of tetrahydrofolate for thymidylate and purine synthesis; high-dose toxicity is rescued by Leucovorin (folinic acid)."
    }
  ],
  11: [
    {
      drug: "Regular (Soluble) Crystalline Insulin",
      class: "Short-Acting Human Recombinant Insulin",
      uses: "• Emergency treatment of choice for Diabetic Ketoacidosis (DKA - only insulin given IV)\n• Hyperosmolar Hyperglycemic State (HHS)\n• Emergency management of severe Hyperkalemia (IV with 50% Dextrose)\n• Perioperative glycemic management",
      pearl: "Rapid onset (30 min) and short duration (5-7 hours) when administered subcutaneously; immediate action when given IV bolus and infusion."
    },
    {
      drug: "Insulin Glargine & Degludec",
      class: "Long-Acting Basal Insulin Analogs",
      uses: "• Once-daily basal background insulin replacement in Type 1 and Type 2 Diabetes Mellitus",
      pearl: "Glargine forms microprecipitates in neutral subcutaneous tissue providing peakless 24-hour delivery; Degludec forms multi-hexamers providing ultra-long >42-hour duration with minimal hypoglycemia risk."
    },
    {
      drug: "Metformin",
      class: "Biguanide / AMPK Activator & Gluconeogenesis Inhibitor",
      uses: "• First-line oral Drug of Choice for all patients with Type 2 Diabetes Mellitus\n• Polycystic Ovary Syndrome (PCOS - restores ovulation and menstrual cyclicity)\n• Pre-diabetes prevention in high-risk individuals",
      pearl: "Suppresses hepatic gluconeogenesis via AMPK activation; does NOT stimulate insulin secretion (zero risk of hypoglycemia); aids modest weight loss; carries a rare black-box risk of Lactic Acidosis in renal failure (contraindicated if eGFR <30)."
    },
    {
      drug: "Dapagliflozin & Empagliflozin",
      class: "Sodium-Glucose Cotransporter-2 (SGLT2) Inhibitors",
      uses: "• Type 2 Diabetes Mellitus with established ASCVD\n• Heart Failure with Reduced or Preserved Ejection Fraction (HFrEF & HFpEF - reduces CV mortality & hospitalizations)\n• Chronic Kidney Disease (slows progression to end-stage renal disease)",
      pearl: "Blocks SGLT2 in renal proximal convoluted tubule to induce glucosuria and natriuresis; lowers blood pressure and weight; side effects include mycotic genital infections, UTIs, and euglycemic DKA."
    },
    {
      drug: "Semaglutide & Liraglutide",
      class: "Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists",
      uses: "• Type 2 Diabetes Mellitus with high cardiovascular risk\n• Chronic Weight Management / Medical Obesity therapy\n• Reduction of major adverse cardiovascular events (MACE) in diabetic patients",
      pearl: "Stimulates glucose-dependent insulin secretion, suppresses inappropriate glucagon release, delays gastric emptying, and activates hypothalamic satiety centers; common nausea/vomiting; contraindicated in personal/family history of Medullary Thyroid Carcinoma or MEN-2."
    },
    {
      drug: "Hydrocortisone (Cortisol)",
      class: "Short-Acting Glucocorticoid (1:1 Glucocorticoid:Mineralocorticoid)",
      uses: "• Drug of Choice for Acute Adrenocortical Insufficiency (Addisonian Crisis - 100 mg IV stat)\n• Physiological daily hormone replacement in primary/secondary Adrenal Insufficiency\n• Congenital Adrenal Hyperplasia (CAH)\n• Refractory Septic Shock & Anaphylactic Shock adjunct",
      pearl: "Equivalent anti-inflammatory potency = 1; mineralocorticoid (salt-retaining) potency = 1; oral equivalent dose = 20 mg."
    },
    {
      drug: "Prednisolone & Methylprednisolone",
      class: "Intermediate-Acting Glucocorticoids",
      uses: "• Systemic Autoimmune Disorders (SLE, Rheumatoid Arthritis, Polymyalgia Rheumatica, Giant Cell Arteritis)\n• Acute severe Exacerbations of Bronchial Asthma and COPD\n• Nephrotic Syndrome in children (Minimal Change Disease Drug of Choice)\n• Bell's Palsy (early oral therapy improves facial nerve recovery)\n• Acute Solid Organ Transplant Rejection",
      pearl: "Prednisolone anti-inflammatory potency = 4; mineralocorticoid potency = 0.8; oral equivalent dose = 5 mg. Methylprednisolone has potency = 5 with minimal salt retention."
    },
    {
      drug: "Dexamethasone",
      class: "Long-Acting Pure Glucocorticoid (Zero Mineralocorticoid Activity)",
      uses: "• Vasogenic Cerebral Edema associated with brain tumors, metastases, and neurosurgery\n• Bacterial Meningitis adjunct (administered before or with first antibiotic dose in S. pneumoniae)\n• Acute Croup (Laryngotracheobronchitis) in children\n• Chemotherapy-Induced Nausea & Vomiting prophylaxis (with 5-HT3 antagonists)\n• Antenatal acceleration of fetal lung surfactant maturity in threatened preterm labor (<34 weeks)\n• Severe COVID-19 with hypoxemia",
      pearl: "Anti-inflammatory potency = 25-30; mineralocorticoid (salt-retaining) potency = ZERO; oral equivalent dose = 0.75 mg; biological half-life 36-54 hours."
    },
    {
      drug: "Fludrocortisone",
      class: "Potent Synthetic Mineralocorticoid Specialist",
      uses: "• Primary Adrenal Insufficiency (Addison's Disease - daily mineralocorticoid replacement)\n• Salt-Wasting Congenital Adrenal Hyperplasia\n• Severe Neurogenic Orthostatic Hypotension",
      pearl: "Mineralocorticoid potency = 125; anti-inflammatory potency = 10; powerfully enhances distal renal tubular sodium reabsorption and potassium/hydrogen excretion."
    }
  ],
  12: [
    {
      drug: "Carbimazole & Methimazole",
      class: "Thionamide Antithyroid Drugs (Thyroperoxidase Inhibitors)",
      uses: "• First-line medical therapy for Hyperthyroidism and Graves' Disease\n• Pre-operative preparation for subtotal thyroidectomy (renders gland euthyroid)\n• Adjunct prior to and following Radioactive Iodine (I-131) ablation",
      pearl: "Inhibits thyroid peroxidase to block oxidation and organification of iodide and coupling of iodotyrosines; Methimazole preferred in 2nd/3rd trimesters; rare risk of agranulocytosis (requires urgent WBC check for sore throat/fever)."
    },
    {
      drug: "Propylthiouracil (PTU)",
      class: "Thionamide Antithyroid Drug + Peripheral T4->T3 Deiodinase Inhibitor",
      uses: "• Hyperthyroidism in the FIRST TRIMESTER of Pregnancy (avoids carbimazole aplasia cutis)\n• Medical management of acute THYROID STORM / Thyroid Crisis",
      pearl: "Inhibits thyroid peroxidase AND peripherally blocks conversion of T4 to active T3; carries a black-box warning for severe fulminant hepatic necrosis."
    },
    {
      drug: "Lugol's Iodine & Potassium Iodide",
      class: "Inorganic Iodide Formulation (Wolff-Chaikoff Effect)",
      uses: "• Emergency treatment of acute Thyroid Storm (rapidly inhibits thyroid hormone release)\n• Pre-operative preparation for thyroidectomy (shrinks gland vascularity and fragility)\n• Protection of thyroid gland from radioactive iodine fallout in nuclear radiation emergencies",
      pearl: "Produces the Wolff-Chaikoff effect: high iodide concentrations acutely suppress thyroperoxidase and block colloid proteolysis and hormone release within 24 hours."
    },
    {
      drug: "Levothyroxine (Sodium L-Thyroxine, T4)",
      class: "Synthetic Thyroid Hormone Replacer",
      uses: "• Drug of Choice for Primary, Secondary, and Congenital Hypothyroidism (Cretinism)\n• Myxedema Coma (IV formulation)\n• TSH suppression therapy in Differentiated Thyroid Carcinoma post-thyroidectomy",
      pearl: "Long half-life (7 days) allows once-daily morning dosing on an empty stomach with water; monitored by serum TSH (takes 6-8 weeks to reach steady-state equilibrium)."
    },
    {
      drug: "Combined Oral Contraceptive Pills (COCPs)",
      class: "Estrogen (Ethinyl Estradiol) + Progestin Combination",
      uses: "• Highly effective reversible female contraception\n• Dysmenorrhea, Menorrhagia, and Endometriosis symptom control\n• Polycystic Ovary Syndrome (PCOS - regulates cycles and treats acne/hirsutism)\n• Long-term reduction of lifetime risk of Ovarian and Endometrial Cancer",
      pearl: "Progestin suppresses the LH surge to block ovulation and thickens cervical mucus; Estrogen suppresses FSH to inhibit follicular maturation; contraindicated in women >35 who smoke (high venous thromboembolism risk)."
    },
    {
      drug: "Levonorgestrel",
      class: "Second-Generation Synthetic Progestin",
      uses: "• Emergency Post-Coital Contraception within 72 hours (Plan B / 1.5 mg single dose)\n• Intrauterine Contraceptive System (Mirena IUD - 5-year contraception & heavy menstrual bleeding)\n• Progestin component of combined oral and transdermal contraceptives",
      pearl: "Emergency contraception acts primarily by delaying or preventing ovulation; ineffective once fertilization and implantation have occurred."
    },
    {
      drug: "Salbutamol (Albuterol)",
      class: "Short-Acting Selective Beta-2 Agonist (SABA Bronchodilator)",
      uses: "• First-line rescue inhaler for Acute Bronchospasm and Acute Asthma Attacks\n• Prevention of Exercise-Induced Bronchoconstriction (inhaled 15 min prior)\n• Emergency treatment of Hyperkalemia (nebulized 10-20 mg shifts K+ into skeletal myocytes)",
      pearl: "Stimulates adenylyl cyclase to increase cAMP in bronchial smooth muscle, producing rapid bronchodilation within 5 minutes; common side effects include fine tremor and tachycardia."
    },
    {
      drug: "Budesonide & Fluticasone (Inhaled)",
      class: "Inhaled Corticosteroids (ICS Controllers)",
      uses: "• First-line daily preventive controller therapy for Persistent Bronchial Asthma\n• Maintenance therapy for symptomatic COPD with frequent exacerbations\n• Allergic Rhinitis (intranasal formulations)",
      pearl: "Suppresses airway inflammation by inhibiting NF-κB and cytokine transcription; patients MUST rinse mouth and spit water after every inhalation to prevent Oral Candidiasis (thrush) and dysphonia."
    },
    {
      drug: "Montelukast",
      class: "Cysteinyl Leukotriene Receptor-1 (CysLT1) Antagonist",
      uses: "• Maintenance therapy for persistent Asthma (especially pediatric and aspirin-sensitive)\n• Aspirin-Exacerbated Respiratory Disease (AERD / Samter's Triad)\n• Allergic Rhinitis and Exercise-Induced Asthma",
      pearl: "Blocks LTD4-mediated bronchoconstriction, airway edema, and mucus hypersecretion; oral once-daily evening tablet; black box warning for neuropsychiatric events (abnormal dreams, depression)."
    }
  ],
  13: [
    {
      drug: "Omeprazole & Pantoprazole",
      class: "Proton Pump Inhibitors (Irreversible H+/K+ ATPase Blockers)",
      uses: "• First-line Drug of Choice for Peptic Ulcer Disease (Duodenal & Gastric ulcers)\n• Gastroesophageal Reflux Disease (GERD) & Erosive Esophagitis\n• Triple and Quadruple Eradication Regimens for Helicobacter pylori\n• Zollinger-Ellison Syndrome (gastrin-secreting neuroendocrine tumor)\n• Prophylaxis against NSAID-induced and stress-related gastric ulceration",
      pearl: "Prodrugs activated in acidic parietal canaliculi into reactive sulfenamides that form permanent covalent disulfide bonds with H+/K+ ATPase pumps; prolonged use reduces B12 and calcium absorption (hypomagnesemia, osteoporotic fractures)."
    },
    {
      drug: "Ondansetron",
      class: "Selective 5-HT3 Serotonin Receptor Antagonist",
      uses: "• First-line Drug of Choice for Chemotherapy-Induced Nausea & Vomiting (CINV)\n• Radiation-Induced Emesis\n• Postoperative Nausea & Vomiting (PONV) prophylaxis and treatment\n• Hyperemesis Gravidarum in pregnancy",
      pearl: "Blocks 5-HT3 receptors on vagal afferent nerve fibers in the gastrointestinal tract and centrally in the Chemoreceptor Trigger Zone (CTZ) and nucleus tractus solitarius; can cause mild headache, constipation, and QT prolongation."
    },
    {
      drug: "Metoclopramide",
      class: "Dopamine D2 Receptor Antagonist & 5-HT4 Agonist (Prokinetic Antiemetic)",
      uses: "• Diabetic Gastroparesis (stimulates gastric antral contractions and accelerates emptying)\n• Gastroesophageal Reflux Disease (GERD)\n• Antiemetic in chemotherapy, radiation, and migraine attacks",
      pearl: "Crosses the blood-brain barrier; readily causes acute extrapyramidal dystonic reactions (oculogyric crisis, torticollis, facial spasm), especially in young women; treated with IV Diphenhydramine or Trihexyphenidyl."
    },
    {
      drug: "Domperidone",
      class: "Peripheral Dopamine D2 Receptor Antagonist (Prokinetic Antiemetic)",
      uses: "• Antiemetic and prokinetic of choice for Parkinson's Disease patients on Levodopa/Dopamine agonists\n• Gastroparesis and functional dyspepsia",
      pearl: "Does NOT cross the blood-brain barrier into the striatum; only acts at the CTZ (which lies outside the BBB in the area postrema); therefore does NOT cause extrapyramidal side effects or worsen parkinsonism."
    },
    {
      drug: "Desferrioxamine (Deferoxamine)",
      class: "Parenteral Iron Chelating Agent",
      uses: "• Specific life-saving Antidote for Acute Iron Poisoning (ferrous sulfate overdose in children)\n• Chronic transfusional Iron Overload / Hemosiderosis in Thalassemia Major",
      pearl: "Binds ferric iron (Fe3+) with extremely high affinity to form stable, water-soluble ferrioxamine excreted in urine, turning the urine a classic 'vin rose' (red-orange) color."
    },
    {
      drug: "D-Penicillamine",
      class: "Copper & Divalent Heavy Metal Chelator",
      uses: "• Drug of Choice for Copper removal in Wilson's Disease (Hepatolenticular Degeneration)\n• Severe active Rheumatoid Arthritis (DMARD)\n• Cystinuria and prevention of cystine renal stones",
      pearl: "Chelates copper, mercury, and lead into soluble urinary complexes; causes pyridoxine (vitamin B6) deficiency (always co-prescribe Pyridoxine); can trigger autoimmune membranous glomerulonephritis."
    },
    {
      drug: "Dimercaprol (BAL - British Anti-Lewisite)",
      class: "Lipid-Soluble Dithiol Heavy Metal Chelator",
      uses: "• Acute Poisoning by Arsenic, Inorganic Mercury, and Gold\n• Severe Lead Poisoning with acute encephalopathy (always combined with Calcium Disodium EDTA)",
      pearl: "Lipid-soluble, penetrates cell membranes and crosses the blood-brain barrier to chelate intracellular metal ions; administered via painful deep intramuscular injection in peanut oil."
    },
    {
      drug: "Calcium Disodium EDTA",
      class: "Water-Soluble Extracellular Lead Chelating Agent",
      uses: "• Acute and Chronic Lead Poisoning (Plumbism) in children and adults",
      pearl: "Supplied as the calcium disodium chelate to prevent dangerous hypocalcemia (which would occur if pure disodium EDTA were infused); clears extracellular lead into urine."
    }
  ],
  14: [
    {
      drug: "Top 50 Drugs of Choice",
      class: "Consolidated High-Yield Emergency & Clinical Indications",
      uses: "• Anaphylaxis: Adrenaline (1:1000 IM)\n• Status Epilepticus: IV Lorazepam -> IV Fosphenytoin\n• PSVT: IV Adenosine\n• Acute Angina: Sublingual Nitroglycerin\n• Acute Heart Failure: IV Furosemide\n• Acute Gout: NSAIDs (Indomethacin) / Colchicine\n• Chronic Gout: Allopurinol / Febuxostat\n• MRSA: Vancomycin / Linezolid\n• Syphilis: Benzathine Penicillin G\n• Myasthenia Gravis: Pyridostigmine\n• Open-Angle Glaucoma: Latanoprost\n• Diabetic Ketoacidosis: Regular IV Insulin\n• DVT in Pregnancy: LMWH (Enoxaparin)",
      pearl: "Mastering these emergency and clinical drugs of choice guarantees top marks in university viva, spotters, and clinical scenario MCQs."
    }
  ],
  15: [
    {
      drug: "University Exam Simulator",
      class: "Full-Length Examination Simulator",
      uses: "• Comprehensive clinical case application across all 14 units\n• Timed rapid retrieval under realistic examination conditions\n• Targeted review of red-flagged active recall cards and complex drug interactions",
      pearl: "Structure university Long Answer Questions (LAQs) as: 1) Definition & Classification, 2) Mechanism of Action with neat flowchart, 3) Pharmacokinetics, 4) Therapeutic Uses with clinical indications, 5) Adverse Effects, 6) Contraindications."
    }
  ]
};

const MOA_DIAGRAMS_DATA = {
  1: [
    {
      title: "G-Protein Coupled Receptor (GPCR) Signaling Cascades",
      diagram: `================================================================================
                      G-PROTEIN COUPLED RECEPTOR DYNAMICS
================================================================================

1. Gs PATHWAY (Stimulatory: β1, β2, β3, D1, H2, V2)
   Ligand -> Gs Receptor -> αs-GTP activates Adenylyl Cyclase
   -> ATP converted to cAMP (2nd messenger)
   -> Activates Protein Kinase A (PKA)
   -> Phosphorylation of target proteins (↑Cardiac inotropy, ↑Lipolysis)

2. Gi PATHWAY (Inhibitory: α2, M2, D2)
   Ligand -> Gi Receptor -> αi-GTP inhibits Adenylyl Cyclase
   -> ↓cAMP -> ↓PKA activity
   -> βγ-subunits open inward-rectifying K+ channels -> Hyperpolarization
   -> Inhibits voltage-gated Ca2+ channels (↓Heart rate, ↓Transmitter release)

3. Gq PATHWAY (Phospholipase C: H1, α1, V1, M1, M3 - "HAVe 1 M&M")
   Ligand -> Gq Receptor -> αq-GTP activates Phospholipase C-β (PLC-β)
   -> Cleaves Membrane PIP2 into two second messengers:
      ├── IP3 (Inositol 1,4,5-trisphosphate)
      │   -> Binds IP3R on Endoplasmic/Sarcoplasmic Reticulum
      │   -> Massive release of stored Ca2+ into cytoplasm
      │   -> Calmodulin activation -> Smooth Muscle Contraction
      └── DAG (1,2-Diacylglycerol)
          -> Remains in cell membrane
          -> Activates Protein Kinase C (PKC) with Ca2+
          -> Cellular proliferation, secretion, and contraction`
    },
    {
      title: "Zero-Order vs First-Order Elimination Kinetics",
      diagram: `================================================================================
                    ZERO-ORDER vs FIRST-ORDER KINETICS
================================================================================

FIRST-ORDER KINETICS (Linear / Most Drugs):
• Rate of elimination is PROPORTIONAL to plasma concentration:  -dC/dt = k · C
• Constant FRACTION of drug eliminated per unit time (e.g. 50% every half-life)
• Constant Half-Life (t½ is independent of dose)
• Steady-state plasma concentration is directly proportional to dose rate

ZERO-ORDER KINETICS (Non-Linear / Saturation / "PEA": Phenytoin, Ethanol, Aspirin):
• Metabolic clearance mechanisms / hepatic enzymes become SATURATED:  -dC/dt = Vmax
• Constant AMOUNT of drug eliminated per unit time (e.g. 10 mg/hour)
• Half-life is NOT constant (t½ increases as dose increases)
• A small dose escalation causes a catastrophic exponential spike in plasma levels!

[Concentration]
     |
     |   Zero-Order (Enzymes Saturated - Constant decline rate)
     |   \\
     |    \\
     |     \\   First-Order (Constant percentage decline per t½)
     |      \\ . . . . .
     |       \\         . . .
     |______________________.____ [Time]`
    }
  ],
  2: [
    {
      title: "Cholinergic Synapse & Organophosphate Toxicity vs Antidotes",
      diagram: `================================================================================
          CHOLINERGIC SYNAPSE: ORGANOPHOSPHATE TOXICITY & ANTIDOTE MOA
================================================================================

PRESYNAPTIC TERMINAL:
  Choline + Acetyl-CoA --[Choline Acetyltransferase]--> Acetylcholine (ACh)
  -> Stored in vesicles via VAChT
  -> Action Potential triggers Ca2+ influx -> Exocytosis into synaptic cleft

SYNAPTIC CLEFT:
  Normal State:
  ACh binds Postsynaptic Receptors (Muscarinic M1-M5 / Nicotinic Nm, Nn)
  -> Excess ACh instantly hydrolyzed by Acetylcholinesterase (AChE):
     ACh + AChE -> Choline + Acetate  (Turnover: 10,000 molecules/sec)

ORGANOPHOSPHATE TOXICITY:
  Organophosphate (OP) irreversibly phosphorylates esteratic site of AChE
  -> Inactivates AChE permanently -> Massive accumulation of ACh everywhere!
  ├── Muscarinic Overstimulation ("DUMBBBELS"):
  │   Diarrhea, Urination, Miosis (pinpoint), Bradycardia, Bronchospasm,
  │   Bronchorrhea (pulmonary drowning), Emesis, Lacrimation, Salivation
  ├── Nicotinic Overstimulation:
  │   Skeletal muscle fasciculations -> Depolarizing Flaccid Paralysis (diaphragm)
  └── Central Nervous System:
      Restlessness, Convulsions, Respiratory Center Depression, Coma

ANTIDOTE MECHANISMS:
  1. ATROPINE (Competitive Muscarinic Antagonist):
     Blocks excessive ACh at all Muscarinic receptors.
     Dries lethal bronchorrhea and reverses bradycardia (does NOT affect Nm muscle).
  2. PRALIDOXIME / 2-PAM (Nucleophilic Oxime Reactivator):
     Binds uninhibited anionic site of AChE; its oxime group launches a nucleophilic
     attack on the phosphate group, displacing the organophosphate from the enzyme!
     *Must be given before 'AGING' (dealkylation making bond irreversible).*`
    }
  ],
  3: [
    {
      title: "Dale's Vasomotor Reversal Phenomenon",
      diagram: `================================================================================
                    DALE'S VASOMOTOR REVERSAL PHENOMENON
================================================================================

PHYSIOLOGICAL BASIS OF ADRENALINE:
Adrenaline acts on BOTH:
  • α1 receptors: Vascular smooth muscle contraction -> VASOCONSTRICTION (↑BP)
  • β2 receptors: Vascular smooth muscle relaxation   -> VASODILATION   (↓BP)

1. NORMAL ADRENALINE (No Pre-treatment):
   Adrenaline IV -> α1 effect (constriction) overrides β2 effect (dilation)
   ==> NET EFFECT: Marked RISE in Mean Arterial Blood Pressure (↑↑BP)

2. AFTER ALPHA-BLOCKER PRE-TREATMENT (e.g. Phenoxybenzamine):
   Alpha receptors are permanently blocked!
   Adrenaline IV -> α1 vasoconstriction CANNOT OCCUR!
   Only β2 receptors on skeletal muscle vascular beds are stimulated!
   ==> NET EFFECT: Paradoxical FALL in Blood Pressure (↓↓BP) = VASOMOTOR REVERSAL!

3. WHY NORADRENALINE NEVER SHOWS VASOMOTOR REVERSAL:
   Noradrenaline acts on α1 and β1, but has VIRTUALLY ZERO β2 activity.
   After alpha-blockade, Noradrenaline has no vasodilator receptor to act upon.
   ==> NET EFFECT: BP response is blunted to zero, but does NOT reverse!`
    }
  ],
  4: [
    {
      title: "Renin-Angiotensin-Aldosterone System (RAAS) & Drug Targets",
      diagram: `================================================================================
                     RAAS CASCADE & PHARMACOLOGICAL TARGETS
================================================================================

                    Angiotensinogen (Liver)
                              |
                              | <--- [Renin]  <=== BLOCKED BY ALISKIREN
                              v
                      Angiotensin I
                              |
                              | <--- [ACE / Kininase II]  <=== BLOCKED BY ACEi
                              |                                (Enalapril, Ramipril)
                              v                                (Blocks Bradykinin breakdown
                      Angiotensin II                            -> Dry Cough & Angioedema)
                              |
            +-----------------+-----------------+
            |                                   |
            v                                   v
      AT1 RECEPTOR                        AT2 RECEPTOR
(BLOCKED BY ARBs: Losartan)             (Vasodilation, Antiproliferative)
            |
  +---------+---------+---------+
  |                   |         |
  v                   v         v
POTENT VASOCONSTRICTION   ALDOSTERONE RELEASE    CARDIAC REMODELING & FIBROSIS
(Efferent arteriole >      (Adrenal Cortex)       (Myocyte hypertrophy)
 Afferent arteriole)         |
  |                          v
↑Systemic BP            Na+ & H2O Retention
(ACEi dilate efferent   K+ & H+ Excretion
 -> collapse GFR in     (BLOCKED BY SPIRONOLACTONE
    bilateral RAS!)      & EPLERENONE)`
    }
  ],
  5: [
    {
      title: "Cardiac Myocyte Calcium Handling, Digoxin & Diuretic Sites",
      diagram: `================================================================================
              DIGOXIN MECHANISM & RENAL NEPHRON DIURETIC SITES
================================================================================

DIGOXIN INOTROPIC MECHANISM:
  Extracellular: Digoxin binds & inhibits myocardial Na+/K+ ATPase pump
  -> Intracellular Na+ increases (cannot be pumped out)
  -> Gradient for Na+/Ca2+ Exchanger (NCX) is dissipated or reversed!
  -> Less Ca2+ is extruded from myocyte -> Intracellular Ca2+ rises
  -> Sarcoplasmic Reticulum (SERCA2a) stores and releases MORE Ca2+ per beat
  -> Enhanced actin-myosin cross-bridging ==> POSITIVE INOTROPY (↑Contractility)

  Toxicity Trigger: K+ competes with Digoxin for the Na+/K+ ATPase binding site.
  In HYPOKALEMIA (from loop diuretics), Digoxin binds unopposed -> Toxic Arrhythmias!

--------------------------------------------------------------------------------
TUBULAR SITES OF DIURETIC ACTION:
1. Proximal Convoluted Tubule:
   Carbonic Anhydrase Inhibitors (Acetazolamide) -> Blocks NaHCO3 reabsorption
2. Thick Ascending Limb of Henle:
   Loop Diuretics (Furosemide) -> Blocks Na+-K+-2Cl- symporter
   Dissipates lumen-positive potential -> Lose Ca2+ & Mg2+ ("Loops Lose Calcium")
3. Distal Convoluted Tubule:
   Thiazides (Hydrochlorothiazide) -> Blocks Na+-Cl- symporter
   Enhances basolateral Na+/Ca2+ exchange -> Retains Ca2+ ("Thiazides Take Calcium")
4. Cortical Collecting Tubule:
   • Aldosterone Antagonists (Spironolactone) -> Blocks nuclear MR receptors
   • ENaC Sodium Channel Blockers (Amiloride) -> Sparing Potassium!`
    }
  ],
  6: [
    {
      title: "GABA-A Receptor Chloride Channel: Benzodiazepines vs Barbiturates",
      diagram: `================================================================================
           GABA-A RECEPTOR: BENZODIAZEPINE vs BARBITURATE MECHANISMS
================================================================================

PENTAMERIC GABA-A RECEPTOR COMPLEX (2α, 2β, 1γ surrounding central Cl- pore):

        [GABA Binding Site]                [Benzodiazepine Site]
          (between α & β)                     (between α & γ)
                 \\                                   /
            +---------------------------------------------+
            |                  EXTRACELLULAR              |
            +---------------------+ +---------------------+
            |        α1           | |         γ2          |
            |   (Cell Membrane)   | |   (Cell Membrane)   |
            |                     | |                     |
            |       ========== CENTRAL Cl- PORE ==========|
            |                     | |                     |
            |        β2           | |   [Barbiturate Site]|
            |                     | |    (deep in channel)|
            +---------------------+ +---------------------+
            |                  INTRACELLULAR              |
            +---------------------------------------------+

BENZODIAZEPINES (Diazepam, Lorazepam):
• Allosteric modulators that increase the FREQUENCY of Cl- channel opening.
• Absolutely REQUIRE endogenous GABA to function.
• CEILING EFFECT: Once all GABA receptors are saturated, channel cannot open further.
• High therapeutic index / safe in overdose; specific antagonist is FLUMAZENIL.

BARBITURATES (Phenobarbitone, Thiopentone):
• Increase the DURATION of Cl- channel opening.
• At high doses, directly open the Cl- channel EVEN IN THE ABSENCE OF GABA (GABA-mimetic).
• NO CEILING EFFECT: Causes progressive medullary respiratory depression, coma, death!
• Low therapeutic index / fatal in overdose; NO specific antidote exists.`
    }
  ],
  7: [
    {
      title: "Arachidonic Acid Cascade & Paracetamol Hepatotoxicity Pathway",
      diagram: `================================================================================
       ARACHIDONIC ACID PATHWAY & PARACETAMOL OVERDOSE HEPATOTOXICITY
================================================================================

MEMBRANE PHOSPHOLIPIDS
        |
        | <--- [Phospholipase A2] <=== INHIBITED BY CORTICOSTEROIDS (Lipocortin-1)
        v
ARACHIDONIC ACID
        |
   +----+----------------------------------------+
   |                                             |
   v [Cyclooxygenase (COX-1 / COX-2)]            v [5-Lipoxygenase (5-LOX)]
   | <=== INHIBITED BY NSAIDs & ASPIRIN          | <=== INHIBITED BY ZILEUTON
   v                                             v
Prostaglandin H2 (PGH2)                     5-HPETE -> Leukotrienes (LTA4)
   |                                             |
   +---> TXA2 (Platelets: Aggregation)           v
   +---> PGI2 (Endothelium: Vasodilation)   LTC4, LTD4, LTE4 (CysLTs)
   +---> PGE2 (Gastric protection, Pain)         | <=== BLOCKED BY MONTELUKAST
                                                 v
                                            Bronchoconstriction & Airway Edema

--------------------------------------------------------------------------------
PARACETAMOL (ACETAMINOPHEN) METABOLISM & OVERDOSE:
Therapeutic Dose:
• 90-95% -> Hepatic Glucuronidation & Sulfation -> Non-toxic urinary metabolites
• 5%     -> Cytochrome P450 (CYP2E1) -> N-acetyl-p-benzoquinone imine (NAPQI)
            -> Rapidly conjugated with Hepatic GLUTATHIONE (GSH) -> Non-toxic

Overdose (>10-15 grams):
• Glucuronide & Sulfate pathways are overwhelmed and SATURATED.
• Excess drug shunted through CYP2E1 -> Massive generation of electrophilic NAPQI.
• Hepatic Glutathione stores become depleted (>70% depletion).
• Unopposed NAPQI covalently binds to cysteine sulfhydryl groups on hepatocyte
  mitochondrial proteins -> Centrilobular Hepatic Necrosis & Acute Liver Failure!

ANTIDOTE: N-ACETYLCYSTEINE (NAC)
• Provides cysteine to synthesize and replenish hepatic GLUTATHIONE reserves.
• Directly conjugates and neutralizes NAPQI before hepatocytes die.`
    }
  ],
  8: [
    {
      title: "Bacterial Cell Wall & Ribosomal Protein Synthesis Targets",
      diagram: `================================================================================
            BACTERIAL CELL WALL & RIBOSOMAL PHARMACOLOGICAL TARGETS
================================================================================

1. BACTERIAL CELL WALL PEPTIDOGLYCAN SYNTHESIS:
   NAM-NAG Pentapeptide Precursors
         |
         | <=== CYCLOSERINE (inhibits D-Ala-D-Ala synthetase)
         v
   Bactoprenol Lipid Carrier flippase
         | <=== BACITRACIN (inhibits dephosphorylation of carrier)
         v
   Transglycosylation & Peptidoglycan cross-linking:
   • VANCOMYCIN: Binds directly to D-Ala-D-Ala terminus of peptidoglycan monomers,
     sterically blocking transglycosylase and transpeptidase enzymes.
   • BETA-LACTAMS (Penicillins, Cephalosporins, Carbapenems):
     Structural analogs of D-Ala-D-Ala that covalently bind to the active serine site
     of Penicillin-Binding Proteins (PBPs / Transpeptidases), blocking cross-linking!

2. BACTERIAL 70S RIBOSOME INHIBITORS ("Buy AT 30, CELL at 50"):

   30S RIBOSOMAL SUBUNIT:
   ├── Aminoglycosides (Gentamicin, Amikacin):
   │   Binds 30S subunit irreversibly -> Freezes initiation complex, causes mRNA
   │   misreading (incorporating incorrect amino acids), and breaks polysomes (Bactericidal!).
   └── Tetracyclines (Doxycycline):
       Binds 30S subunit reversibly -> Blocks aminoacyl-tRNA from binding to the A-site.

   50S RIBOSOMAL SUBUNIT:
   ├── Chloramphenicol: Binds 50S -> Inhibits Peptidyltransferase (peptide bond formation).
   ├── Macrolides (Azithromycin, Clarithromycin) & Clindamycin:
   │   Binds 50S 23S rRNA -> Blocks Translocation (movement of ribosome along mRNA).
   └── Linezolid (Oxazolidinone):
       Binds 50S subunit -> Blocks formation of the 70S functional initiation complex.`
    }
  ],
  9: [
    {
      title: "Mycobacterium Tuberculosis Bacillary Targets (HRZES)",
      diagram: `================================================================================
           FIRST-LINE ANTI-TUBERCULAR DRUGS (HRZES) SITES OF ACTION
================================================================================

MYCOBACTERIAL CELL WALL ENVELOPE (Outside to Inside: Mycolic Acid -> Arabinogalactan -> Peptidoglycan):

1. ISONIAZID (H) - Bactericidal:
   • Prodrug activated by mycobacterial catalase-peroxidase (KatG).
   • Forms an adduct with NAD+ that inhibits InhA (enoyl-ACP reductase) in Fatty Acid
     Synthase II, halting MYCOLIC ACID synthesis (essential cell wall lipid).

2. RIFAMPICIN (R) - Sterilizing Bactericidal:
   • Binds to the β-subunit of DNA-dependent RNA Polymerase (rpoB gene).
   • Halts bacterial RNA transcription and protein synthesis; kills semi-dormant spurters.

3. PYRAZINAMIDE (Z) - Sterilizing Bactericidal:
   • Converted by pyrazinamidase (pncA) into active Pyrazinoic Acid in acidic environments.
   • Disrupts mycobacterial membrane potential and inhibits fatty acid synthesis (FAS-1)
     in slowly replicating bacilli inside acidic macrophage phagolysosomes.

4. ETHAMBUTOL (E) - BACTERIOSTATIC:
   • Inhibits Arabinosyl Transferase enzyme (encoded by embB gene).
   • Blocks polymerization of arabinose into ARABINOGALACTAN (linking mycolic acid to peptidoglycan).
   • Increases cell wall permeability to companion bactericidal drugs.

5. STREPTOMYCIN (S) - Bactericidal Aminoglycoside:
   • Binds to 30S ribosomal subunit (protein S12) to block initiation and cause misreading.`
    }
  ],
  10: [
    {
      title: "Coagulation Cascade & Anticoagulant Drug Targets",
      diagram: `================================================================================
                  COAGULATION CASCADE & ANTITHROMBOTIC TARGETS
================================================================================

INTRINSIC PATHWAY (Monitored by aPTT)         EXTRINSIC PATHWAY (Monitored by PT/INR)
Surface contact -> Factor XII -> XI -> IX        Tissue Factor + Factor VIIa
                                  |                         |
                                  v                         v
                           Factor VIIIa                Factor VIIa
                                  \\                         /
                                   \\                       /
                                    v                     v
                                      FACTOR X  ----->  FACTOR Xa
                                                           | <=== DIRECT FACTOR Xa INHIBITORS
                                                           |      (Rivaroxaban, Apixaban)
                                                           | <=== HEPARIN + AT-III COMPLEX
                                                           v
                                                  Prothrombin (II)
                                                           |
                                                           v
                                                     THROMBIN (IIa)
                                                           | <=== DIRECT THROMBIN INHIBITORS
                                                           |      (Dabigatran, Bivalirudin)
                                                           | <=== HEPARIN + AT-III COMPLEX
                                                           v
                                                 Fibrinogen  ----->  FIBRIN CLOT
                                                                        |
                                                                        v  <=== ALTEPLASE (tPA)
                                                                    Fibrin Degradation
                                                                    Products (D-dimer)

WARFARIN MECHANISM:
Inhibits Vitamin K Epoxide Reductase (VKORC1), blocking post-translational
gamma-carboxylation of glutamic acid residues on factors II, VII, IX, X and Protein C & S.`
    }
  ],
  11: [
    {
      title: "Corticosteroids: Cellular Site of Action & Genomic Mechanisms",
      diagram: `================================================================================
        CORTICOSTEROIDS: CELLULAR SITE OF ACTION & GENOMIC MECHANISMS
================================================================================

CELLULAR & MOLECULAR MECHANISM:
1. LIPID-SOLUBLE STEROID (Hydrocortisone, Prednisolone, Dexamethasone)
   diffuses freely across the plasma membrane into target cell cytoplasm.

2. Binds with high affinity to the CYTOSOLIC GLUCOCORTICOID RECEPTOR (GRα).
   Binding triggers conformational dissociation of molecular chaperone proteins
   (Heat Shock Proteins: HSP90, HSP70, Immunophilin FKBP52).

3. Ligand-bound GR homodimerizes and translocates rapidly through nuclear pore complexes
   into the CELL NUCLEUS.

4. DUAL GENOMIC TRANSCRIPTIONAL ACTIONS IN NUCLEUS:

   A. TRANSACTIVATION (Gene Induction / Up-Regulation):
      • GR homodimer binds directly to Glucocorticoid Response Elements (GRE) on DNA.
      • Induces transcription of anti-inflammatory proteins:
        - LIPOCORTIN-1 (Annexin A1) -> Powerful inhibitor of Phospholipase A2!
          (Blocks production of all Prostaglandins, Leukotrienes, and PAF)
        - IκB-α (Inhibitor of NF-κB -> traps NF-κB in cytoplasm)
        - Anti-inflammatory cytokines: IL-10, Annexin-1, Neutral Endopeptidase.
        - Beta-2 Adrenoceptor gene transcription (reverses beta-receptor desensitization).

   B. TRANSREPRESSION (Gene Repression / Down-Regulation):
      • Monomeric GR physically binds to and inactivates master pro-inflammatory
        transcription factors: NF-κB (p65) and AP-1 (c-Jun/c-Fos).
      • Recruits Histone Deacetylase-2 (HDAC2) to unwind and silence chromatin.
      • Shuts down transcription of inflammatory genes:
        - Cytokines: TNF-α, IL-1β, IL-2, IL-3, IL-4, IL-5, IL-6, IL-8, IL-12, GM-CSF
        - Inflammatory Enzymes: COX-2, Inducible Nitric Oxide Synthase (iNOS)
        - Adhesion Molecules: ICAM-1, VCAM-1, E-Selectin (blocks leukocyte extravasation)

--------------------------------------------------------------------------------
SYSTEMIC ORGAN SITE EFFECTS:
• Liver: Stimulates PEPCK and G6Pase -> ↑Hepatic Gluconeogenesis & Glycogen storage
• Muscle & Connective Tissue: Inhibits GLUT4 glucose uptake -> Proteolysis & muscle wasting
• Adipose Tissue: Stimulates lipolysis -> Free fatty acids redistributed centrally
  (causes Cushingoid moon facies, buffalo hump, and truncal obesity)
• Bone: Activates osteoclasts & inhibits osteoblasts -> Reduces Ca2+ absorption -> Osteoporosis
• Immune System: Induces apoptosis of T-lymphocytes & eosinophils -> Lymphopenia, Eosinopenia
  (Neutrophil count paradoxically rises due to demargination from vascular endothelium)
• Pituitary / Hypothalamus: Negative feedback suppression of CRH and ACTH release
  -> Bilateral Adrenocortical Atrophy (abrupt cessation causes fatal Addisonian Crisis!)`
    },
    {
      title: "Corticosteroid Relative Potency & Pharmacokinetics Comparison Table",
      diagram: `================================================================================
    CORTICOSTEROID RELATIVE POTENCY & PHARMACOKINETICS COMPARISON TABLE
================================================================================

┌─────────────────────┬─────────────────┬────────────────┬────────────┬──────────────┐
│ Corticosteroid Drug │ Anti-Inflam.    │ Mineralocortic.│ Equivalent │ Biological   │
│                     │ Potency (GR)    │ Potency (MR)   │ Dose (mg)  │ Half-Life    │
├─────────────────────┼─────────────────┼────────────────┼────────────┼──────────────┤
│ SHORT-ACTING (t½ 8 - 12 hours):                                                    │
│ Hydrocortisone      │       1         │       1        │   20 mg    │ Short (8-12h)│
│ (Cortisol/Natural)  │ (Baseline ref)  │ (Baseline ref) │            │              │
│ Cortisone           │      0.8        │      0.8       │   25 mg    │ Short (8-12h)│
├─────────────────────┼─────────────────┼────────────────┼────────────┼──────────────┤
│ INTERMEDIATE-ACTING (t½ 18 - 36 hours):                                            │
│ Prednisolone        │       4         │      0.8       │    5 mg    │ Inter (18-36)│
│ Prednisone          │       4         │      0.8       │    5 mg    │ Inter (18-36)│
│ Methylprednisolone  │       5         │      0.5       │    4 mg    │ Inter (18-36)│
│ Triamcinolone       │       5         │       0        │    4 mg    │ Inter (18-36)│
├─────────────────────┼─────────────────┼────────────────┼────────────┼──────────────┤
│ LONG-ACTING (t½ 36 - 54 hours - Pure Glucocorticoids, Zero Salt Retention):       │
│ Dexamethasone       │     25 - 30     │       0        │  0.75 mg   │ Long (36-54h)│
│ Betamethasone       │     25 - 30     │       0        │  0.75 mg   │ Long (36-54h)│
├─────────────────────┼─────────────────┼────────────────┼────────────┼──────────────┤
│ MINERALOCORTICOID SPECIALIST (High Salt Retention):                                │
│ Fludrocortisone     │      10         │      125       │    2 mg    │ Inter (18-36)│
│ Aldosterone         │       0         │     3,000      │     --     │ Ultra-Short  │
└─────────────────────┴─────────────────┴────────────────┴────────────┴──────────────┘

CLINICAL PEARLS:
• Dexamethasone is 25x-30x more potent than Hydrocortisone with ZERO salt retention,
  making it ideal for cerebral edema and bacterial meningitis where fluid retention is fatal.
• Hydrocortisone has balanced 1:1 mineralocorticoid activity, making it the Drug of Choice
  for acute Addisonian Crisis and physiological hormone replacement.
• Fludrocortisone has 125x mineralocorticoid potency, used exclusively for primary adrenal
  salt-wasting in Addison's disease and orthostatic hypotension.`
    }
  ],
  12: [
    {
      title: "Bronchial Smooth Muscle Signaling & Asthma Stepwise Therapy",
      diagram: `================================================================================
       BRONCHIAL SMOOTH MUSCLE SIGNALING & ASTHMA DRUG MECHANISMS
================================================================================

BRONCHODILATION PATHWAYS:
  1. Beta-2 Adrenergic Agonists (Salbutamol, Formoterol):
     Stimulates Gs -> Activates Adenylyl Cyclase -> Converts ATP to cAMP
     -> cAMP activates Protein Kinase A (PKA) -> Phosphorylates MLCK (inactivating it)
     -> Sequesters intracellular Ca2+ -> BRONCHODILATION!
  2. Phosphodiesterase Inhibitors (Theophylline):
     Inhibits PDE-3 and PDE-4 enzymes -> Halts cAMP breakdown -> Prolongs bronchodilation.
  3. Muscarinic Antagonists (Ipratropium, Tiotropium):
     Competitively blocks acetylcholine at postjunctional M3 receptors on smooth muscle
     -> Inhibits Gq-PLC-IP3 pathway -> Prevents bronchoconstriction and mucus secretion.

BRONCHOCONSTRICTION PATHWAYS:
  1. Leukotrienes (LTC4, LTD4, LTE4):
     Binds CysLT1 receptors on airway myocytes -> 1,000x more potent than histamine!
     BLOCKED BY MONTELUKAST & ZAFIRLUKAST.
  2. Chronic Mucosal Inflammation:
     Eosinophils, Th2 lymphocytes, mast cells release cytokines (IL-4, IL-5, IL-13)
     REPRESSED GENOMICALLY BY INHALED CORTICOSTEROIDS (Budesonide, Fluticasone).`
    }
  ],
  13: [
    {
      title: "Gastric Parietal Cell Acid Secretion & Ulcer Pharmacotherapy",
      diagram: `================================================================================
      GASTRIC PARIETAL CELL ACID SECRETION & ULCER PHARMACOTHERAPY
================================================================================

PARIETAL CELL BASOLATERAL MEMBRANE:
  1. HISTAMINE (ECL Cells) -> H2 Receptor (Gs) -> ↑Adenylyl Cyclase -> ↑cAMP
     [BLOCKED BY H2 BLOCKERS: Ranitidine, Famotidine]
  2. ACETYLCHOLINE (Vagus) -> M3 Receptor (Gq) -> ↑PLC -> ↑IP3/DAG -> ↑Ca2+
     [BLOCKED BY ANTICHOLINERGICS: Pirenzepine]
  3. GASTRIN (Antral G Cells) -> CCK-B Receptor (Gq) -> ↑Ca2+
  4. PROSTAGLANDIN E2 / I2 -> EP3 Receptor (Gi) -> ↓cAMP -> ↓Acid + ↑Mucus/Bicarb
     [STIMULATED BY MISOPROSTOL; INHIBITED BY NSAIDs]

FINAL COMMON LUMINAL PATHWAY (APICAL CANALICULUS):
  Both ↑cAMP and ↑Ca2+ activate the catalytic alpha subunit of the:
                     H+ / K+ ATPase PROTON PUMP
     (Pumps 1 H+ into gastric lumen in exchange for 1 K+ reabsorbed)
                           |
                           | <=== PERMANENTLY BLOCKED BY PPIs (Omeprazole, Pantoprazole)
                           v
           GASTRIC HYDROCHLORIC ACID (pH 0.8 - 1.5)

MUCOSAL BARRIER PROTECTANTS:
• SUCRALFATE (Aluminum sucrose sulfate): Undergoes acid-catalyzed polymerization to form
  a viscous, sticky, negatively charged paste that binds to positively charged protein
  exudates at the base of peptic ulcers, creating a physical protective bandage.`
    }
  ],
  14: [
    {
      title: "Master High-Yield Antidote Mechanisms Summary",
      diagram: `================================================================================
               MASTER HIGH-YIELD ANTIDOTE MECHANISMS SUMMARY
================================================================================

POISON / TOXIC OVERDOSE       SPECIFIC ANTIDOTE          MOA OF REVERSAL
--------------------------------------------------------------------------------
1. Paracetamol (Acetaminophen) N-Acetylcysteine (NAC)     Replenishes hepatic glutathione (GSH)
2. Opioids (Morphine, Heroin)  Naloxone (IV)              Pure competitive μ-opioid antagonist
3. Benzodiazepines (Diazepam)  Flumazenil (IV)            Competitive antagonist at BZD GABA-A pocket
4. Organophosphates / Nerve Ag Pralidoxime (2-PAM)        Nucleophilic reactivation of phosphorylated AChE
5. Atropine / Belladonna       Physostigmine (slow IV)    Tertiary amine AChE inhibitor (crosses BBB)
6. Beta-Blockers               IV Glucagon                Non-adrenergic myocardial cAMP elevation
7. Digoxin (Digitalis)         DigiFab (Fab fragments)    Antibody fragments bind & neutralize digoxin
8. Heparin (Unfractionated)    Protamine Sulfate          Positively charged base neutralizes acidic heparin
9. Warfarin                    Vitamin K1 + 4-Factor PCC  Co-factor for clotting factor carboxylation
10. Methotrexate Toxicity      Leucovorin (Folinic Acid)  Reduced folate bypasses blocked DHFR
11. Iron (Acute Overdose)      Desferrioxamine (IV)       Chelates Fe3+ into harmless ferrioxamine
12. Copper / Wilson's Disease  D-Penicillamine            Chelates divalent copper into urinary complex
13. Lead (Plumbism)            Calcium Disodium EDTA+BAL  BAL crosses BBB; CaNa2-EDTA clears extracellular
14. Carbon Monoxide (CO)       100% Hyperbaric Oxygen     Displaces CO from carboxyhemoglobin (HbCO)
15. Cyanide                    Hydroxocobalamin / Nitrite Binds CN- to form nontoxic cyanocobalamin (B12)`
    }
  ],
  15: [
    {
      title: "University Theory & Viva Structured LAQ Answering Template",
      diagram: `================================================================================
         UNIVERSITY PHARMACOLOGY THEORY & VIVA ANSWERING BLUEPRINT
================================================================================

Always organize any Long Answer Question (LAQ) or Short Answer Question (SAQ)
using this 6-point examiner-approved structure:

1. DEFINITION & CLASSIFICATION (Always draw clean flowcharts with neat branches!)
   - Pharmacological class, prototypes, and chemical generation/subtypes.

2. MECHANISM OF ACTION (MOA)
   - Cellular / receptor target (e.g. G-protein, enzyme, ion channel, ribosome).
   - Downstream second-messenger cascade (cAMP, IP3/DAG, Ca2+, protein kinase).
   - End-organ physiological and pharmacological effects.

3. PHARMACOKINETICS (ADME)
   - Absorption (bioavailability, first-pass metabolism, food interactions).
   - Distribution (plasma protein binding, Vd, BBB and placental penetration).
   - Metabolism (hepatic microsomal CYP enzymes, active metabolites).
   - Excretion (renal clearance, biliary/fecal elimination, half-life).

4. THERAPEUTIC USES & CLINICAL INDICATIONS
   - Highlight Drug of Choice (DOC) indications in bold.
   - Emergency indications, chronic maintenance, and secondary prophylaxis.

5. ADVERSE DRUG REACTIONS (ADRs)
   - Predictable extension effects (Type A - dose-dependent).
   - Idiosyncratic / allergic effects (Type B - immune-mediated).
   - Classic black-box warnings, teratogenicity, and organ toxicities.

6. CONTRAINDICATIONS & IMPORTANT DRUG INTERACTIONS
   - Absolute contraindications vs relative cautions.
   - Dangerous synergistic or antagonistic drug-drug interactions.`
    }
  ]
};

module.exports = { DRUG_USES_DATA, MOA_DIAGRAMS_DATA };

