/* =========================================================
   GLOBAL ERROR HANDLER
   ========================================================= */
window.addEventListener('error', (e) => {
  console.error('Uncaught error:', e.error || e.message);
});
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

/* =========================================================
   I18N
   ========================================================= */
const I18N = {
  nl: {
    appTitle:'Gang Sheet Builder', appSubtitle:'Transferpersshop · 300 DPI print-ready',
    projectTitleLabel:'Transfer naam', projectTitlePlaceholder:"Bijv. borstlogo's bedrijf X",
    clear:'Leegmaken', clearSheet:'Vel leegmaken',
    step1:'Kies vel formaat', step2:"Upload logo's", step3:"Logo's bewerken", step4:"Logo's bewerken",
    dropTitle:'Klik of sleep hier', dropHint:'SVG, EPS, AI, PDF, PNG, JPG', dropMax:'Max. 50 MB',
    uploadTip:'Gebruik vectorbestanden (SVG, EPS, AI, PDF) of PNGs met transparante achtergrond van minimaal 300 dpi voor de scherpste prints.',
    uploadTipLink:'Bekijk onze tips',
    loadingVector:'Vector wordt verwerkt…',
    unsupportedFile:'Bestandstype niet ondersteund',
    epsConvertHint:'Dit EPS-bestand kan niet worden geopend. Sla het op als PDF of SVG vanuit Illustrator en upload opnieuw.',
    epsLoading:'EPS-bestand wordt geconverteerd…',
    unitLabel:'Meeteenheid',
    gapLabel:"Tussenruimte tussen logo's",
    gapHelp:"Bepaal de tussenruimte tussen de logo's voor het knippen/snijden van de transfers.",
    bgLabel:'Vel-achtergrond (alleen preview)',
    bgHelp:"Witte logo's zie je het best op checkered of grijs. De export blijft transparant.",
    bgRemove:'Verwijder witte achtergrond',
    thresholdLabel:'Drempelwaarde',
    thresholdHelp:'Lager = meer lichte pixels weg. Hoger = alleen puur wit.',
    bgAi:'AI achtergrond verwijderen',
    fillSheet:'Vel vullen met logo',
    fillHelp:'Selecteer een logo om witverwijdering te gebruiken. "Vel vullen" en "Vel leegmaken" staan boven het vel.',
    selectedTitle:'Geselecteerde logo',
    infoSheet:'Vel', infoUsed:'Gebruikt',
    selected:'Geselecteerde logo',
    selectEmpty:'Klik op een logo om te bewerken.',
    allLogos:"Alle logo's",
    listEmpty:'Nog niets geüpload.',
    summaryTitle:'Samenvatting',
    sumUnique:"Unieke logo's",
    sumTotal:'Totaal aantal kopieën',
    sumUsage:'Gebruik van vel',
    sumDpi:'Print kwaliteit (DPI)',
    sumSheets:'Aantal vellen',
    sumColor:'Kleurruimte',
    exportBtn:'Download print-ready PDF',
    close:'Sluiten',
    zoomFit:'Passend', zoomHint:'Sneltoetsen: +, −, 0',
    width:'Breedte', height:'Hoogte', rotation:'Rotatie', logoSize:'Afmeting logo', actions:'Acties', ratioLock:'Verhouding vergrendelen', ratioUnlock:'Verhouding ontgrendelen',
    sectionTransform:'Transformatie', sectionAppearance:'Uiterlijk', sectionLayout:'Indeling', sectionInfo:'Info',
    dpiAt:'Resolutie bij deze grootte',
    quality:'Kwaliteit',
    dpiHint:'DPI is de scherpte van de print. 300 DPI of hoger geeft een scherpe print. Hoe lager de DPI, hoe waziger het logo op het eindproduct.',
    tbRotate:'↻ 90°', tbFlip:'⇆ spiegel', tbDup:'⧉ dupliceer', tbDel:'✕ verwijder',
    colorsLabel:'Kleuren',
    colorClickToChange:'Klik op een kleur om te wijzigen',
    colorTint:'Tint/overlay kleur',
    colorApplyTint:'Tint toepassen',
    colorRemoveTint:'Tint verwijderen',
    colorChanged:'Kleur gewijzigd',
    colorNoColors:'Geen bewerkbare kleuren gevonden',
    colorApply:'Kleur toepassen',
    sheetLabel:'Vel', addSheet:'+ Nieuw vel',
    multiSheetOnly:'Meerdere vellen zijn alleen beschikbaar bij 55×100 cm.',
    sheetChanged:'Vel gewijzigd naar',
    sizeTooLarge:'Logo te groot om te tilen op dit vel',
    overlapWarn:"Logo's mogen niet overlappen. Positie is teruggezet.",
    smallDetailWarn:'Let op: dit logo bevat details kleiner dan 0.4 mm bij deze grootte. Zeer fijne details kunnen verloren gaan in de print.',
    embeddedRasterWarn:'Dit vectorbestand bevat een ingesloten afbeelding (raster). De printkwaliteit hangt af van de resolutie van die afbeelding.',
    embeddedRasterHint:'Dit vectorbestand bevat een ingesloten afbeelding. De DPI is gebaseerd op die afbeelding, niet op het vectorbestand zelf.',
    lowDpiWarn:'Resolutie laag',
    lowDpiMore:'Voor scherp printen heb je minstens 300 DPI nodig. Maak het logo kleiner of upload een grotere versie.',
    pdfGenerating:'PDF wordt aangemaakt…',
    pdfSaved:'opgeslagen · 300 DPI',
    addLogoFirst:'Voeg eerst een logo toe',
    lowResFound:'Lage resolutie gevonden',
    lowResBody:'logo(s) zijn onder 300 DPI en kunnen wazig printen. Toch exporteren?',
    lowResOk:'Toch exporteren',
    cancel:'Annuleren', ok:'Ja, doorgaan',
    selectImageFirst:'Selecteer eerst een afbeelding',
    bgRemoved:'Witte achtergrond verwijderd',
    bgAiTitle:'AI achtergrond verwijderen',
    bgAiBody:"Deze functie gebruikt remove.bg of een vergelijkbare AI-service voor foto's en complexere afbeeldingen. In de productieversie koppel je hier een API-key. In deze demo is de AI-knop uitgeschakeld — gebruik de browser-versie hierboven voor platte witte achtergronden.",
    clearTitle:'Leegmaken',
    clearBody:"Weet je zeker dat je het hele vel wilt leegmaken? Alle logo's worden verwijderd.",
    clearDone:'Vel leeggemaakt',
    fillTitle:'Vul hele blad',
    fillBody:(sheet,name,gap)=>`Het vel (${sheet}) vullen met kopieën van "${name}"? Tussenruimte: ${gap} mm. Als het beter past wordt het logo automatisch 90° gedraaid.`,
    fillDone:(n,cols,rows,rot)=>`${n} kopieën geplaatst · ${cols}×${rows}${rot?' · 90° gedraaid':''}`,
    noFillActive:'Geen fill template actief',
    logoGone:'Bronlogo niet meer aanwezig — upload opnieuw',
    copies:'stuks', logos:"logo's", logo:'logo',
    removeSheet:'Vel verwijderen?',
    removeSheetBody:"Alle logo's op dit vel gaan verloren.",
    repackDone:'Indeling bijgewerkt met nieuwe tussenruimte',
    spillToNew:(n)=>`Geen plek meer — automatisch verplaatst naar vel ${n}`,
    sheetFullNoSpill:'Geen plek meer op dit vel (niet-multi modus)',
    rot0:'0°', rot90:'90°', rot180:'180°', rot270:'270°', rotReset:'reset',
    infoTitle:'Productie-informatie',
    infoTipDetail:'Minimale detailgrootte',
    infoTipDetailBody:'Details kleiner dan 0,4 mm (1 pt) kunnen wegvallen tijdens productie. Houd hier rekening mee bij kleine teksten, dunne lijnen en fijne patronen.',
    infoTipVector:'Vector boven raster',
    infoTipVectorBody:'Gebruik bij voorkeur vectorbestanden (SVG, EPS, AI, PDF). Deze zijn schaalbaar zonder kwaliteitsverlies. PNG en JPG zijn rasterbestanden — hoe groter je ze maakt, hoe lager de DPI en hoe waziger de print.',
    infoTipDpi:'Resolutie (DPI)',
    infoTipDpiBody:'Voor scherpe prints heb je minimaal 300 DPI nodig. Upload rasterbestanden in de hoogst mogelijke resolutie. De tool toont automatisch een waarschuwing als de DPI te laag is.',
    infoTipBg:'Transparante achtergrond',
    infoTipBgBody:'Gebruik PNGs met transparante achtergrond. Een witte achtergrond wordt meegeprint als wit vlak rondom je logo. De "Verwijder witte achtergrond" functie kan helpen, maar een echt transparant bronbestand is altijd beter.',
    tourSkip:'Sluiten', tourNext:'Volgende', tourFinish:'Afronden',
    tourStepProjectTitle:'Transfer naam',
    tourStepProjectBody:'Geef je transfer een naam. Deze verschijnt onderaan elke pagina van de PDF samen met Transferpersshop en de datum.',
    tourStep1Title:'Kies vel formaat',
    tourStep1Body:'Selecteer het formaat van je vel. 55×100 DTF is het standaard formaat voor DTF-rollen en ondersteunt automatisch meerdere vellen.',
    tourStep2Title:"Upload logo's",
    tourStep2Body:'Sleep je bestanden hierheen of klik om te uploaden. Vectorbestanden (SVG, EPS, AI, PDF) geven de scherpste resultaten. PNGs met transparante achtergrond op minimaal 300 DPI zijn ook uitstekend.',
    tourStep3Title:"Logo's bewerken",
    tourStep3Body:'Pas de tussenruimte aan, verwijder witte achtergronden en stel de drempelwaarde in. Selecteer een logo op het vel om het te roteren, schalen of dupliceren.',
    tourStep4Title:'Vel vullen',
    tourStep4Body:'Selecteer een logo en klik "Vel vullen met logo" om het vel automatisch zo vol mogelijk te vullen. De tool draait logo\'s als dat meer kopieën oplevert.',
    tourStep5Title:'Samenvatting & export',
    tourStep5Body:'Bekijk het totaal aantal kopieën, velgebruik en DPI-status. Klik "Download print-ready PDF" om een 300 DPI transparante PDF te genereren.',
    tourStep6Title:'Eenheid & achtergrond',
    tourStep6Body:'Wissel hier tussen mm en cm als maateenheid. Kies een vel-achtergrond (wit, grijs of geruit) om je logo\'s beter te zien — de export blijft altijd transparant.',
    tourStepZoomTitle:'Zoom & velknoppen',
    tourStepZoomBody:'Zoom in en uit op je vel met de knoppen of sneltoetsen (+, −, 0). Hier vind je ook "Vel vullen" om het vel automatisch vol te pakken en "Vel leegmaken" om opnieuw te beginnen.',
    tourStepSelTitle:'Geselecteerde logo',
    tourStepSelBody:'Klik op een logo op het vel om het hier te bewerken. Pas de afmeting, rotatie en kleuren aan, of dupliceer en verwijder het logo.',
    tourStepGapTitle:'Tussenruimte',
    tourStepGapBody:'Stel de afstand tussen logo\'s in. Deze tussenruimte wordt overal toegepast: bij kopiëren, dupliceren en "Vel vullen".',
    tourStepListTitle:"Alle logo's",
    tourStepListBody:'Overzicht van al je geüploade logo\'s met het totale aantal kopieën over alle vellen. Gebruik de +/− knoppen of typ een aantal om snel kopieën toe te voegen of te verwijderen.',
    undoBtn:'Ongedaan maken', redoBtn:'Herhalen',
    projectSave:'Project opslaan', projectLoad:'Project laden',
    shortcutsBtn:'⌨ Sneltoetsen', shortcutsTitle:'Sneltoetsen',
    shortcutsBody:'Ctrl+Z: Ongedaan · Ctrl+Shift+Z: Herhalen · Ctrl+D: Dupliceer · Delete: Verwijder · Pijltoetsen: Verschuif · +/−: Zoom · 0: Passend · Ctrl+A: Alle selecteren',
    optimizeLayout:'Optimaliseer indeling', optimizeDone:'Indeling geoptimaliseerd',
    selectMultiple:'Meerdere geselecteerd', deleteMultiple:'Verwijder alles', duplicateMultiple:'Dupliceer alles', rotateMultiple:'Roteer alles 90°',
    printPreview:'Preview', previewTitle:'Print preview',
  },
  en: {
    appTitle:'Gang Sheet Builder', appSubtitle:'Transferpersshop · 300 DPI print-ready',
    projectTitleLabel:'Transfer name', projectTitlePlaceholder:'E.g. chest logos company X',
    clear:'Clear', clearSheet:'Clear sheet',
    step1:'Choose sheet size', step2:'Upload logos', step3:'Edit logos', step4:'Edit logos',
    dropTitle:'Click or drop files', dropHint:'SVG, EPS, AI, PDF, PNG, JPG', dropMax:'Max. 50 MB',
    uploadTip:'Use vector files (SVG, EPS, AI, PDF) or PNGs with transparent background of at least 300 dpi for the sharpest prints.',
    uploadTipLink:'View our tips',
    loadingVector:'Processing vector file…',
    unsupportedFile:'File type not supported',
    epsConvertHint:'This EPS file could not be opened. Save it as PDF or SVG from Illustrator and re-upload.',
    epsLoading:'Converting EPS file…',
    unitLabel:'Measurement unit',
    gapLabel:'Spacing between logos',
    gapHelp:'Set the spacing between logos for cutting/trimming the transfers.',
    bgLabel:'Sheet background (preview only)',
    bgHelp:'White logos show best on checkered or gray. Exports stay transparent.',
    bgRemove:'Remove white background',
    thresholdLabel:'Threshold',
    thresholdHelp:'Lower = more light pixels removed. Higher = only pure white.',
    bgAi:'AI background removal',
    fillSheet:'Fill sheet with logo',
    fillHelp:'Select a logo to use background removal. "Fill sheet" and "Clear sheet" are above the sheet.',
    selectedTitle:'Selected logo',
    infoSheet:'Sheet', infoUsed:'Used',
    selected:'Selected logo',
    selectEmpty:'Click a logo to edit it.',
    allLogos:'All logos',
    listEmpty:'Nothing uploaded yet.',
    summaryTitle:'Summary',
    sumUnique:'Unique logos',
    sumTotal:'Total copies',
    sumUsage:'Sheet usage',
    sumDpi:'Print quality (DPI)',
    sumSheets:'Number of sheets',
    sumColor:'Color space',
    exportBtn:'Download print-ready PDF',
    close:'Close',
    zoomFit:'Fit', zoomHint:'Shortcuts: +, −, 0',
    width:'Width', height:'Height', rotation:'Rotation', logoSize:'Logo size', actions:'Actions', ratioLock:'Lock aspect ratio', ratioUnlock:'Unlock aspect ratio',
    sectionTransform:'Transform', sectionAppearance:'Appearance', sectionLayout:'Layout', sectionInfo:'Info',
    dpiAt:'Resolution at this size',
    quality:'Quality',
    dpiHint:'DPI is the sharpness of the print. 300 DPI or higher gives a sharp print. The lower the DPI, the blurrier the logo on the final product.',
    tbRotate:'↻ 90°', tbFlip:'⇆ flip', tbDup:'⧉ duplicate', tbDel:'✕ delete',
    colorsLabel:'Colors',
    colorClickToChange:'Click a color to change it',
    colorTint:'Tint/overlay color',
    colorApplyTint:'Apply tint',
    colorRemoveTint:'Remove tint',
    colorChanged:'Color changed',
    colorNoColors:'No editable colors found',
    colorApply:'Apply color',
    sheetLabel:'Sheet', addSheet:'+ New sheet',
    multiSheetOnly:'Multiple sheets are only available for 55×100 cm.',
    sheetChanged:'Sheet changed to',
    sizeTooLarge:'Logo too large to tile on this sheet',
    overlapWarn:'Logos may not overlap. Position has been reverted.',
    smallDetailWarn:'Warning: this logo contains details smaller than 0.4 mm at this size. Very fine details may be lost in print.',
    embeddedRasterWarn:'This vector file contains an embedded image (raster). Print quality depends on the resolution of that image.',
    embeddedRasterHint:'This vector file contains an embedded image. The DPI is based on that image, not the vector file itself.',
    lowDpiWarn:'Low resolution',
    lowDpiMore:'You need at least 300 DPI for sharp printing. Make the logo smaller or upload a higher-resolution version.',
    pdfGenerating:'Generating PDF…',
    pdfSaved:'saved · 300 DPI',
    addLogoFirst:'Add a logo first',
    lowResFound:'Low resolution found',
    lowResBody:'logo(s) are below 300 DPI and may print blurry. Export anyway?',
    lowResOk:'Export anyway',
    cancel:'Cancel', ok:'Yes, continue',
    selectImageFirst:'Select an image first',
    bgRemoved:'White background removed',
    bgAiTitle:'AI background removal',
    bgAiBody:'This uses remove.bg or a similar AI service for photos and complex images. In production you plug in an API key. In this demo the AI button is disabled — use the browser version above for flat white backgrounds.',
    clearTitle:'Clear sheet',
    clearBody:'Clear the whole sheet? All logos will be removed.',
    clearDone:'Sheet cleared',
    fillTitle:'Fill sheet',
    fillBody:(sheet,name,gap)=>`Fill the ${sheet} sheet with copies of "${name}"? Spacing: ${gap} mm. The logo is automatically rotated 90° if that packs better.`,
    fillDone:(n,cols,rows,rot)=>`${n} copies placed · ${cols}×${rows}${rot?' · 90° rotated':''}`,
    noFillActive:'No fill template active',
    logoGone:'Source logo is gone — please upload again',
    copies:'pcs', logos:'logos', logo:'logo',
    removeSheet:'Remove this sheet?',
    removeSheetBody:'All logos on this sheet will be lost.',
    repackDone:'Layout updated with new spacing',
    spillToNew:(n)=>`No space left — automatically moved to sheet ${n}`,
    sheetFullNoSpill:'No space left on this sheet (single-sheet mode)',
    rot0:'0°', rot90:'90°', rot180:'180°', rot270:'270°', rotReset:'reset',
    infoTitle:'Production information',
    infoTipDetail:'Minimum detail size',
    infoTipDetailBody:'Details smaller than 0.4 mm (1 pt) may be lost during production. Keep this in mind for small text, thin lines, and fine patterns.',
    infoTipVector:'Vector over raster',
    infoTipVectorBody:'Use vector files (SVG, EPS, AI, PDF) whenever possible. They scale without quality loss. PNG and JPG are raster files — the larger you make them, the lower the DPI and the blurrier the print.',
    infoTipDpi:'Resolution (DPI)',
    infoTipDpiBody:'You need at least 300 DPI for sharp prints. Upload raster files at the highest possible resolution. The tool automatically warns you if the DPI is too low.',
    infoTipBg:'Transparent background',
    infoTipBgBody:'Use PNGs with transparent backgrounds. A white background will print as a white block around your logo. The "Remove white background" feature can help, but a truly transparent source file is always better.',
    tourSkip:'Close', tourNext:'Next', tourFinish:'Finish',
    tourStepProjectTitle:'Transfer name',
    tourStepProjectBody:'Give your transfer a name. It appears at the bottom of each PDF page along with Transferpersshop and the date.',
    tourStep1Title:'Choose sheet size',
    tourStep1Body:'Select the format for your sheet. 55×100 DTF is the default format for DTF rolls and supports automatic multi-sheet overflow.',
    tourStep2Title:'Upload logos',
    tourStep2Body:'Drag files here or click to upload. Vector files (SVG, EPS, AI, PDF) give the sharpest results. PNGs with transparent backgrounds at 300+ DPI are also excellent.',
    tourStep3Title:'Edit logos',
    tourStep3Body:'Adjust spacing, remove white backgrounds, and set the threshold. Select a logo on the sheet to rotate, scale, or duplicate it.',
    tourStep4Title:'Fill sheet',
    tourStep4Body:'Select a logo and click "Fill sheet with logo" to automatically pack the sheet as full as possible. The tool rotates logos if that yields more copies.',
    tourStep5Title:'Summary & export',
    tourStep5Body:'Review total copies, sheet usage, and DPI status. Click "Download print-ready PDF" to generate a 300 DPI transparent PDF.',
    tourStep6Title:'Units & background',
    tourStep6Body:'Switch between mm and cm as your unit of measurement. Choose a sheet background (white, gray, or checkered) to see your logos better — the export always stays transparent.',
    tourStepZoomTitle:'Zoom & sheet buttons',
    tourStepZoomBody:'Zoom in and out on your sheet with the buttons or shortcuts (+, −, 0). Here you\'ll also find "Fill sheet" to auto-pack the sheet and "Clear sheet" to start over.',
    tourStepSelTitle:'Selected logo',
    tourStepSelBody:'Click a logo on the sheet to edit it here. Adjust size, rotation, and colors, or duplicate and delete the logo.',
    tourStepGapTitle:'Spacing',
    tourStepGapBody:'Set the distance between logos. This spacing is applied everywhere: when copying, duplicating, and "Fill sheet".',
    tourStepListTitle:'All logos',
    tourStepListBody:'Overview of all your uploaded logos with the total number of copies across all sheets. Use the +/− buttons or type a number to quickly add or remove copies.',
    undoBtn:'Undo', redoBtn:'Redo',
    projectSave:'Save project', projectLoad:'Load project',
    shortcutsBtn:'⌨ Shortcuts', shortcutsTitle:'Keyboard Shortcuts',
    shortcutsBody:'Ctrl+Z: Undo · Ctrl+Shift+Z: Redo · Ctrl+D: Duplicate · Delete: Remove · Arrow keys: Move · +/−: Zoom · 0: Fit · Ctrl+A: Select all',
    optimizeLayout:'Optimize layout', optimizeDone:'Layout optimized',
    selectMultiple:'Multiple selected', deleteMultiple:'Delete all', duplicateMultiple:'Duplicate all', rotateMultiple:'Rotate all 90°',
    printPreview:'Preview', previewTitle:'Print preview',
  }
};

function t(key, ...args){
  const dict = I18N[state.lang] || I18N.nl;
  const v = dict[key];
  if(typeof v === 'function') return v(...args);
  return v !== undefined ? v : key;
}

/* =========================================================
   CONFIG + STATE
   ========================================================= */
const SHEET_SIZES = [
  { id:'55x100', label:'55×100 DTF', w:550, h:1000 },
  { id:'A5', label:'A5', w:148, h:210 },
  { id:'A4', label:'A4', w:210, h:297 },
  { id:'A3', label:'A3', w:297, h:420 }
];
const MULTI_SHEET_IDS = ['55x100'];
const DPI_TARGET = 300;
const MM_PER_INCH = 25.4;
let displayPxPerMm = 1.6;
let idCounter = 0;

const state = {
  sheet: SHEET_SIZES[0],
  unit: 'mm',
  lang: 'nl',
  selectedId: null,
  gapMm: 5,
  sheetBg: 'checker',
  zoom: 1,
  fillTemplate: null,
  sheetTabs: [{ json: null, fillTemplate: null }],
  activeTab: 0,
};

/* =========================================================
   UNDO/REDO SYSTEM
   ========================================================= */
const undoRedoStack = {
  undo: [],
  redo: [],
  _statsDirty: true,
  _statsCache: null,
  maxStates: 30,

  push(state) {
    this.undo.push(state);
    if(this.undo.length > this.maxStates) this.undo.shift();
    this.redo = [];
    this._statsDirty = true;
  },

  pop() {
    return this.undo.pop();
  },

  peekRedo() {
    return this.redo.length > 0 ? this.redo[this.redo.length - 1] : null;
  },

  pushRedo(state) {
    this.redo.push(state);
    if(this.redo.length > this.maxStates) this.redo.shift();
    this._statsDirty = true;
  },

  popRedo() {
    return this.redo.pop();
  }
};

/* ── Undo / redo helpers ──
   pushUndo()      — call BEFORE a programmatic change (delete, duplicate,
                     recolor, repack, fill, clear, etc.)
   Interactive transforms (drag/scale/rotate) are captured automatically
   via before:transform → modified events on the canvas. */

let _isLoadingState = false;       // guard: don't record while restoring
let _preTransformSnap = null;      // snapshot taken before drag/scale/rotate

function pushUndo() {
  if(_isLoadingState) return;
  const json = JSON.stringify(canvas.toJSON(FABRIC_EXTRA_PROPS));
  undoRedoStack.undo.push(json);
  if(undoRedoStack.undo.length > undoRedoStack.maxStates) undoRedoStack.undo.shift();
  undoRedoStack.redo = [];          // new action kills redo branch
  undoRedoStack._statsDirty = true;
  updateUndoRedoButtons();
}

function undo() {
  if(undoRedoStack.undo.length === 0) return;
  const current = JSON.stringify(canvas.toJSON(FABRIC_EXTRA_PROPS));
  const prev = undoRedoStack.undo.pop();
  undoRedoStack.redo.push(current); // save current so redo can get back
  loadCanvasState(prev);
  updateUndoRedoButtons();
}

function redo() {
  if(undoRedoStack.redo.length === 0) return;
  const current = JSON.stringify(canvas.toJSON(FABRIC_EXTRA_PROPS));
  const next = undoRedoStack.redo.pop();
  undoRedoStack.undo.push(current); // push current without clearing redo
  loadCanvasState(next);
  updateUndoRedoButtons();
}

function loadCanvasState(jsonStr) {
  _isLoadingState = true;
  invalidateAllThumbs();
  canvas.loadFromJSON(jsonStr, () => {
    canvas.getObjects().forEach(o => attachObjListeners(o));
    canvas.renderAll();
    _isLoadingState = false;
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    undoRedoStack._statsDirty = true;
  });
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  if(undoBtn) undoBtn.disabled = undoRedoStack.undo.length === 0;
  if(redoBtn) redoBtn.disabled = undoRedoStack.redo.length === 0;
}

const { jsPDF } = window.jspdf;

/* =========================================================
   CANVAS
   ========================================================= */
const canvas = new fabric.Canvas('canvas', {
  backgroundColor: null,
  preserveObjectStacking: true,
  selection: true,
});

const FABRIC_EXTRA_PROPS = [
  '_id','_originalId','_name','_naturalW','_naturalH',
  '_mmW','_mmH','_mmLeft','_mmTop','_isFillTile','_svgSource',
  '_embeddedRasterW','_embeddedRasterH','_vectorOrigin'
];

/* Capture state BEFORE any interactive transform starts.
   The snapshot is pushed to the undo stack when 'modified' fires. */
canvas.on('before:transform', () => {
  if(!_isLoadingState){
    _preTransformSnap = JSON.stringify(canvas.toJSON(FABRIC_EXTRA_PROPS));
  }
});

function attachObjListeners(o){
  o.on('modified', ()=>{
    clampObjToSheet(o); syncMmFromPx(o);
    // Push the PRE-transform snapshot (state before drag/scale/rotate)
    if(_preTransformSnap && !_isLoadingState){
      undoRedoStack.undo.push(_preTransformSnap);
      if(undoRedoStack.undo.length > undoRedoStack.maxStates) undoRedoStack.undo.shift();
      undoRedoStack.redo = [];
      undoRedoStack._statsDirty = true;
      _preTransformSnap = null;
      updateUndoRedoButtons();
    }
  });
  o.on('moving',   ()=>{ clampObjToSheet(o); syncMmFromPx(o); drawAlignmentGuides(o); });
  o.on('scaling',  ()=>{ clampObjToSheet(o); syncMmFromPx(o); });
  o.on('rotating', ()=>{ clampObjToSheet(o); syncMmFromPx(o); });
  o.set({
    cornerColor:'#1d9aaf', cornerStrokeColor:'#1d9aaf', borderColor:'#1d9aaf',
    cornerSize:10, transparentCorners:false, hasRotatingPoint:true,
    lockUniScaling: true, // always lock aspect ratio
  });
  // Hide side/edge scaling handles — only corners allowed (proportional)
  o.setControlsVisibility({ mt:false, mb:false, ml:false, mr:false });
}

/* =========================================================
   SMART ALIGNMENT GUIDES
   ========================================================= */
const guideCtx = document.createElement('canvas').getContext('2d');
let guideLines = { h: [], v: [] };

function drawAlignmentGuides(movingObj) {
  if(!movingObj) return;
  guideLines = { h: [], v: [] };

  const snapThreshold = 3 * displayPxPerMm; // 3mm in pixels
  const movingRect = movingObj.getBoundingRect(true, true);

  canvas.getObjects().forEach(o => {
    if(o === movingObj || !o._mmW) return;
    const otherRect = o.getBoundingRect(true, true);

    // Check horizontal alignment (left, center, right edges)
    if(Math.abs(movingRect.left - otherRect.left) < snapThreshold)
      guideLines.v.push(movingRect.left);
    if(Math.abs((movingRect.left + movingRect.width/2) - (otherRect.left + otherRect.width/2)) < snapThreshold)
      guideLines.v.push(movingRect.left + movingRect.width/2);
    if(Math.abs((movingRect.left + movingRect.width) - (otherRect.left + otherRect.width)) < snapThreshold)
      guideLines.v.push(movingRect.left + movingRect.width);

    // Check vertical alignment (top, center, bottom edges)
    if(Math.abs(movingRect.top - otherRect.top) < snapThreshold)
      guideLines.h.push(movingRect.top);
    if(Math.abs((movingRect.top + movingRect.height/2) - (otherRect.top + otherRect.height/2)) < snapThreshold)
      guideLines.h.push(movingRect.top + movingRect.height/2);
    if(Math.abs((movingRect.top + movingRect.height) - (otherRect.top + otherRect.height)) < snapThreshold)
      guideLines.h.push(movingRect.top + movingRect.height);
  });

  canvas.requestRenderAll();
}

canvas.on('after:render', () => {
  if(!guideLines.h.length && !guideLines.v.length) return;

  const ctx = canvas.contextContainer;
  ctx.save();
  ctx.strokeStyle = '#1d9aaf';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);

  // Draw vertical guides
  guideLines.v.forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  });

  // Draw horizontal guides
  guideLines.h.forEach(y => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  });

  ctx.restore();
});

canvas.on('mouse:up', () => {
  guideLines = { h: [], v: [] };
});

// Keep an object's axis-aligned bounding rect inside the sheet (the canvas).
// Works for rotated, scaled, and centered-origin objects.
function clampObjToSheet(obj){
  if(!obj || !obj.setCoords) return;
  obj.setCoords();
  const br = obj.getBoundingRect(true, true);
  const cw = canvas.getWidth(), ch = canvas.getHeight();
  let dx = 0, dy = 0;
  if(br.width <= cw){
    if(br.left < 0) dx = -br.left;
    else if(br.left + br.width > cw) dx = cw - (br.left + br.width);
  } else {
    // Logo wider than sheet: snap left edge to 0.
    dx = -br.left;
  }
  if(br.height <= ch){
    if(br.top < 0) dy = -br.top;
    else if(br.top + br.height > ch) dy = ch - (br.top + br.height);
  } else {
    dy = -br.top;
  }
  if(dx || dy){
    obj.left += dx;
    obj.top  += dy;
    obj.setCoords();
  }
}

function resizeSheet(){
  const wrap = document.getElementById('canvasWrap');
  const maxW = wrap.clientWidth - 60;
  const maxH = wrap.clientHeight - 80;
  const sheetMmW = state.sheet.w, sheetMmH = state.sheet.h;
  const basePxW = sheetMmW * 3, basePxH = sheetMmH * 3;
  const fitScale = Math.min(maxW/basePxW, maxH/basePxH, 1);
  const scale = fitScale * state.zoom;
  const pxW = Math.round(sheetMmW * 3 * scale);
  const pxH = Math.round(sheetMmH * 3 * scale);
  displayPxPerMm = pxW / sheetMmW;
  canvas.setWidth(pxW);
  canvas.setHeight(pxH);
  const shadow = document.getElementById('sheetShadow');
  shadow.style.width = pxW+'px';
  shadow.style.height = pxH+'px';
  canvas.getObjects().forEach(o=>{
    if(o._mmW && o._mmH){
      // Keep visual mm dimensions constant regardless of current scale/rotation state.
      // We rescale keeping the existing scaleX/scaleY ratio + angle.
      const isRotated = Math.abs(((o.angle||0)%180)) > 0.1;
      const natW = o.width, natH = o.height;
      if(isRotated){
        o.scaleY = (o._mmW * displayPxPerMm) / natH;
        o.scaleX = (o._mmH * displayPxPerMm) / natW;
      } else {
        o.scaleX = (o._mmW * displayPxPerMm) / natW;
        o.scaleY = (o._mmH * displayPxPerMm) / natH;
      }
      if(o.originX === 'center' && o.originY === 'center'){
        o.left = (o._mmLeft + o._mmW/2) * displayPxPerMm;
        o.top  = (o._mmTop  + o._mmH/2) * displayPxPerMm;
      } else {
        o.left = o._mmLeft * displayPxPerMm;
        o.top  = o._mmTop  * displayPxPerMm;
      }
      o.setCoords();
    }
  });
  canvas.requestRenderAll();
  updateInfoBar();
  document.getElementById('zoomVal').textContent = Math.round(state.zoom * 100) + '%';
}

/* =========================================================
   SHEET TABS (multi-sheet for 55x100)
   ========================================================= */
// Multi-sheet + auto-spill is only enabled for 55×100 DTF rolls. Other
// formats are single-sheet: if the sheet is full, the user gets a warning.
function isMultiSheet(){ return MULTI_SHEET_IDS.includes(state.sheet.id); }

function saveCurrentTabState(){
  const tab = state.sheetTabs[state.activeTab];
  tab.json = canvas.toJSON(FABRIC_EXTRA_PROPS);
  tab.fillTemplate = state.fillTemplate ? {
    originalId: state.fillTemplate.originalId,
    mmW: state.fillTemplate.mmW, mmH: state.fillTemplate.mmH,
    angle: state.fillTemplate.angle, name: state.fillTemplate.name,
    naturalW: state.fillTemplate.naturalW, naturalH: state.fillTemplate.naturalH,
  } : null;
}

function loadTabState(idx, cb){
  state.activeTab = idx;
  const tab = state.sheetTabs[idx];
  canvas.clear();
  state.fillTemplate = null;
  state.selectedId = null;
  undoRedoStack._statsDirty = true;
  const done = ()=>{
    canvas.getObjects().forEach(o=>attachObjListeners(o));
    if(tab.fillTemplate){
      const sample = canvas.getObjects().find(o => o._originalId === tab.fillTemplate.originalId);
      if(sample) state.fillTemplate = { ...tab.fillTemplate, sampleObj: sample };
    }
    resizeSheet();
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    updateSummary();
    renderSheetTabs();
    if(cb) cb();
  };
  if(tab.json){ canvas.loadFromJSON(tab.json, done); } else { done(); }
}

function addSheetTab(){
  if(!isMultiSheet()){ toast(t('multiSheetOnly'),'warn'); return; }
  saveCurrentTabState();
  state.sheetTabs.push({ json:null, fillTemplate:null });
  loadTabState(state.sheetTabs.length - 1);
}

function removeSheetTab(idx){
  if(state.sheetTabs.length <= 1) return;
  confirmModal(t('removeSheet'), t('removeSheetBody')).then(ok=>{
    if(!ok) return;
    if(state.activeTab !== idx){
      state.sheetTabs.splice(idx, 1);
      if(state.activeTab > idx) state.activeTab--;
      renderSheetTabs();
      updateSummary();
    } else {
      state.sheetTabs.splice(idx, 1);
      const newIdx = Math.min(idx, state.sheetTabs.length - 1);
      loadTabState(newIdx);
    }
  });
}

function switchToTab(idx){
  if(idx === state.activeTab) return;
  saveCurrentTabState();
  loadTabState(idx);
}

function renderSheetTabs(){
  const container = document.getElementById('sheetTabs');
  if(!isMultiSheet()){
    container.style.display = 'none';
    if(state.sheetTabs.length > 1){
      const active = state.sheetTabs[state.activeTab];
      state.sheetTabs = [active];
      state.activeTab = 0;
    }
    return;
  }
  container.style.display = 'flex';
  container.innerHTML = '';
  state.sheetTabs.forEach((tab, i)=>{
    const el = document.createElement('div');
    el.className = 'sheet-tab' + (i === state.activeTab ? ' active' : '');
    const label = document.createElement('span');
    label.textContent = `${t('sheetLabel')} ${i+1}`;
    el.appendChild(label);
    if(state.sheetTabs.length > 1){
      const close = document.createElement('button');
      close.className = 'close';
      close.innerHTML = '×';
      close.title = t('removeSheet');
      close.onclick = (e)=>{ e.stopPropagation(); removeSheetTab(i); };
      el.appendChild(close);
    }
    el.onclick = ()=>switchToTab(i);
    container.appendChild(el);
  });
  const addBtn = document.createElement('button');
  addBtn.className = 'sheet-tab-add';
  addBtn.textContent = t('addSheet');
  addBtn.onclick = addSheetTab;
  container.appendChild(addBtn);
}

/* =========================================================
   SIZE PICKER + UNIT
   ========================================================= */
function renderSizeGrid(){
  const grid = document.getElementById('sizeGrid');
  grid.innerHTML = '';
  SHEET_SIZES.forEach(s=>{
    const b = document.createElement('button');
    b.className = 'size-btn' + (s.id===state.sheet.id?' active':'');
    b.innerHTML = `${s.label}<small>${fmtSize(s.w,s.h)}</small>`;
    b.onclick = ()=>setSheetSize(s);
    grid.appendChild(b);
  });
}

function setSheetSize(s){
  if(s.id === state.sheet.id) return;
  const wasMulti = isMultiSheet();
  const willMulti = MULTI_SHEET_IDS.includes(s.id);
  if(wasMulti && !willMulti && state.sheetTabs.length > 1){
    saveCurrentTabState();
    const active = state.sheetTabs[state.activeTab];
    state.sheetTabs = [active];
    state.activeTab = 0;
  }
  state.sheet = s;
  renderSizeGrid();
  resizeSheet();
  renderSheetTabs();
  updateInfoBar();
  updateSummary();
  toast(`${t('sheetChanged')} ${s.label}`, 'success');
}

function fmtSize(mmW, mmH){
  if(state.unit==='mm') return `${mmW} × ${mmH} mm`;
  return `${(mmW/10).toFixed(1)} × ${(mmH/10).toFixed(1)} cm`;
}

function updateInfoBar(){
  document.getElementById('infoSize').textContent = fmtSize(state.sheet.w, state.sheet.h);
  const totalArea = state.sheet.w * state.sheet.h;
  let used = 0;
  let logoCount = 0;
  const uniqueIds = new Set();
  canvas.getObjects().forEach(o=>{ if(o._mmW){ used += o._mmW * o._mmH; logoCount++; uniqueIds.add(o._originalId); } });
  const pct = Math.min(100, Math.round((used/totalArea)*100));
  document.getElementById('infoUsedVal').textContent = pct+'%';
  document.getElementById('infoLogoCount').textContent = logoCount;
  document.getElementById('fillMeter').style.width = pct+'%';
  // Optimize button only active with 2+ unique logos on the sheet
  document.getElementById('optimizeBtn').disabled = uniqueIds.size < 2;
  // Clear button only active with 1+ logo on the sheet
  document.getElementById('clearBtn').disabled = logoCount < 1;
  updateSummary();
}

document.getElementById('unitToggle').addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  const u = e.target.dataset.unit;
  state.unit = u;
  [...e.currentTarget.children].forEach(b=>b.classList.toggle('active', b.dataset.unit===u));
  renderSizeGrid();
  updateInfoBar();
  renderSelectedPanel();
  renderItemList();
  syncGapUI();
});

/* =========================================================
   UPLOAD
   ========================================================= */
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
uploadArea.addEventListener('click', ()=>fileInput.click());
['dragover','dragenter'].forEach(ev=>uploadArea.addEventListener(ev, e=>{
  e.preventDefault(); uploadArea.classList.add('drag');
}));
['dragleave','drop'].forEach(ev=>uploadArea.addEventListener(ev, e=>{
  e.preventDefault(); uploadArea.classList.remove('drag');
}));
uploadArea.addEventListener('drop', e=>{ e.preventDefault(); handleFiles(e.dataTransfer.files); });
fileInput.addEventListener('change', e=>{
  handleFiles(e.target.files);
  // Reset value so picking the same file again still fires 'change'
  e.target.value = '';
});

function handleFiles(files){
  [...files].forEach(file=>{
    const type = file.type;
    const ext = file.name.split('.').pop().toLowerCase();
    if(type==='image/svg+xml' || ext==='svg'){
      const reader = new FileReader();
      reader.onload = ev=>loadSvg(ev.target.result, file.name);
      reader.readAsText(file);
    } else if(ext==='ai'){
      // AI files: try SVG first (some are SVG), then try PDF rendering.
      const reader = new FileReader();
      reader.onload = ev=>{
        const text = ev.target.result;
        if(text.indexOf('<svg') !== -1){
          loadSvg(text, file.name);
        } else {
          // Re-read as ArrayBuffer for pdf.js
          const reader2 = new FileReader();
          reader2.onload = ev2=>loadPdfAsImage(ev2.target.result, file.name);
          reader2.readAsArrayBuffer(file);
        }
      };
      reader.readAsText(file);
    } else if(ext==='eps'){
      // EPS strategy (multi-layered for maximum compatibility):
      // 1. Embedded SVG (rare but ideal — instant)
      // 2. Embedded PDF stream (Illustrator "PDF Compatibility")
      // 3. Ghostscript WASM fallback (handles ALL EPS files)
      const reader = new FileReader();
      reader.onload = ev=>{
        const buf = ev.target.result;
        const bytes = new Uint8Array(buf);
        const text = new TextDecoder('latin1').decode(bytes);

        // 1. Embedded SVG?
        const svgStart = text.indexOf('<svg');
        if(svgStart !== -1){
          const svgEnd = text.indexOf('</svg>', svgStart);
          if(svgEnd !== -1){
            loadSvg(text.substring(svgStart, svgEnd + 6), file.name);
            return;
          }
        }

        // 2. Embedded PDF stream? (Illustrator "PDF Compatibility" mode)
        const pdfStart = text.indexOf('%PDF-');
        if(pdfStart !== -1){
          let pdfEnd = text.lastIndexOf('%%EOF');
          if(pdfEnd !== -1) pdfEnd += 5; else pdfEnd = bytes.length;
          const pdfBuf = buf.slice(pdfStart, pdfEnd);
          loadPdfAsImage(pdfBuf, file.name);
          return;
        }

        // 3. Server-side Ghostscript — handles any EPS file
        loadEpsViaServer(buf, file.name);
      };
      reader.readAsArrayBuffer(file);
    } else if(type==='application/pdf' || ext==='pdf'){
      const reader = new FileReader();
      reader.onload = ev=>loadPdfAsImage(ev.target.result, file.name);
      reader.readAsArrayBuffer(file);
    } else if(type.startsWith('image/')){
      const reader = new FileReader();
      reader.onload = ev=>loadRaster(ev.target.result, file.name);
      reader.readAsDataURL(file);
    } else {
      toast(`${t('unsupportedFile')}: ${file.name}`, 'error');
    }
  });
}

function loadRaster(dataUrl, name){
  fabric.Image.fromURL(dataUrl, img=>{
    const targetMmW = state.sheet.w * 0.25;
    const ratio = img.height / img.width;
    placeImage(img, name, targetMmW, targetMmW * ratio, img.width, img.height);
  }, { crossOrigin:'anonymous' });
}

// Render the first page of a PDF/AI file at 300 DPI equivalent using pdf.js,
// strip the white page background to transparent, then place on the canvas.
async function loadPdfAsImage(arrayBuffer, name){
  if(!window.pdfjsLib){
    toast('PDF.js niet geladen — kan PDF/AI niet openen.', 'error');
    return;
  }
  toast(t('loadingVector'), 'info', 3000);
  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    // Render at a scale that produces ~300 DPI output.
    // PDF default = 72 units/inch. Scale 300/72 ≈ 4.17.
    const scale = 300 / 72;
    const viewport = page.getViewport({ scale });
    const offscreen = document.createElement('canvas');
    offscreen.width  = Math.round(viewport.width);
    offscreen.height = Math.round(viewport.height);
    const ctx = offscreen.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;

    // --- Smart white background detection ---
    // Only strip white if the image has a solid white border (page background),
    // not if white is part of the actual design. We check the outer 2px edge:
    // if >90% of edge pixels are near-white, it's a page bg and we strip it.
    const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    const px = imgData.data;
    const BG_THRESH = 250;
    const ow = offscreen.width, oh = offscreen.height;
    let edgeWhite = 0, edgeTotal = 0;
    for(let x = 0; x < ow; x++){
      for(const y of [0, 1, oh-2, oh-1]){
        const i = (y * ow + x) * 4;
        edgeTotal++;
        if(px[i] >= BG_THRESH && px[i+1] >= BG_THRESH && px[i+2] >= BG_THRESH) edgeWhite++;
      }
    }
    for(let y = 2; y < oh-2; y++){
      for(const x of [0, 1, ow-2, ow-1]){
        const i = (y * ow + x) * 4;
        edgeTotal++;
        if(px[i] >= BG_THRESH && px[i+1] >= BG_THRESH && px[i+2] >= BG_THRESH) edgeWhite++;
      }
    }
    const hasPageBg = edgeTotal > 0 && (edgeWhite / edgeTotal) > 0.90;
    if(hasPageBg){
      for(let i = 0; i < px.length; i += 4){
        if(px[i] >= BG_THRESH && px[i+1] >= BG_THRESH && px[i+2] >= BG_THRESH){
          px[i+3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    const dataUrl = offscreen.toDataURL('image/png');
    const naturalW = offscreen.width;
    const naturalH = offscreen.height;
    fabric.Image.fromURL(dataUrl, img=>{
      const targetMmW = state.sheet.w * 0.25;
      const ratio = naturalH / naturalW;
      // Mark as vector-origin file so the panel shows context.
      img._vectorOrigin = true;
      placeImage(img, name, targetMmW, targetMmW * ratio, naturalW, naturalH);
    }, { crossOrigin:'anonymous' });
  } catch(err){
    console.error('PDF load error:', err);
    toast(`⚠️ "${name}": kon bestand niet openen. Probeer het om te zetten naar SVG of PNG.`, 'error', 6000);
    throw err; // re-throw so callers (EPS handler) can catch
  }
}

/* =========================================================
   EPS RENDERING — Server-side Ghostscript via API
   Sends pure EPS files to a conversion endpoint that runs
   Ghostscript and returns SVG (vector, editable, scalable).
   ========================================================= */
const EPS_CONVERTER_URL = 'https://eps-converter-transferpersshop.onrender.com/convert';

async function loadEpsViaServer(arrayBuffer, name){
  // First try pdf.js (works for EPS with embedded PDF that our
  // text-scan might have missed in binary-wrapped files)
  try {
    await loadPdfAsImage(arrayBuffer, name);
    return; // success
  } catch(e){ /* expected — continue to server conversion */ }

  // Send to conversion API → SVG (vector output)
  toast(t('epsLoading'), 'info', 5000);
  try {
    const formData = new FormData();
    formData.append('file', new Blob([arrayBuffer], { type:'application/postscript' }), name);

    const resp = await fetch(EPS_CONVERTER_URL + '?format=svg', {
      method: 'POST',
      body: formData
    });

    if(!resp.ok){
      const errData = await resp.json().catch(()=>({ error:'Server error' }));
      throw new Error(errData.error || `HTTP ${resp.status}`);
    }

    const svgText = await resp.text();

    // Load as SVG vector — fully editable (colors, scalable)
    loadSvg(svgText, name);
  } catch(err){
    console.error('EPS server conversion failed:', err);
    toast(`⚠️ "${name}": ${t('epsConvertHint')}`, 'warn', 8000);
  }
}

function loadSvg(svgText, name){
  // Detect embedded raster images inside the SVG.
  const embeddedRaster = detectEmbeddedRaster(svgText);

  fabric.loadSVGFromString(svgText, (objects, options)=>{
    const group = fabric.util.groupSVGElements(objects, options);
    const naturalW = group.width || options.width || 200;
    const naturalH = group.height || options.height || 200;
    const targetMmW = state.sheet.w * 0.25;
    const ratio = naturalH / naturalW;
    // Set SVG properties BEFORE placeImage so checkDpi / calcEffectiveDpi
    // can correctly detect this as a vector during initial placement.
    group._svgSource = svgText;
    if(embeddedRaster){
      group._embeddedRasterW = embeddedRaster.w;
      group._embeddedRasterH = embeddedRaster.h;
    }
    placeImage(group, name, targetMmW, targetMmW * ratio, naturalW, naturalH);
    if(embeddedRaster){
      toast(`⚠️ "${name}": ${t('embeddedRasterWarn')}`, 'warn', 8000);
    }
  });
}

// Parse SVG text for <image> tags with raster data. Returns {w,h} of the
// largest embedded raster, or null if the SVG is pure vector.
function detectEmbeddedRaster(svgText){
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const images = doc.querySelectorAll('image');
  if(!images.length) return null;
  let maxW = 0, maxH = 0;
  images.forEach(img=>{
    const w = parseFloat(img.getAttribute('width')) || 0;
    const h = parseFloat(img.getAttribute('height')) || 0;
    if(w * h > maxW * maxH){ maxW = w; maxH = h; }
  });
  return maxW > 0 ? { w: maxW, h: maxH } : null;
}

function placeImage(obj, name, mmW, mmH, naturalW, naturalH){
  const spot = ensureSpotOnAnySheet(mmW, mmH);
  if(!spot) return;
  const id = ++idCounter;
  obj._id = id;
  obj._originalId = id;
  obj._name = name;
  obj._naturalW = naturalW;
  obj._naturalH = naturalH;
  obj._mmW = mmW;
  obj._mmH = mmH;
  obj._mmLeft = spot.x;
  obj._mmTop  = spot.y;
  obj.set({ originX:'left', originY:'top' });
  obj.scaleX = (mmW * displayPxPerMm) / obj.width;
  obj.scaleY = (mmH * displayPxPerMm) / obj.height;
  obj.left = spot.x * displayPxPerMm;
  obj.top  = spot.y * displayPxPerMm;
  attachObjListeners(obj);
  canvas.add(obj);
  canvas.setActiveObject(obj);
  canvas.requestRenderAll();
  renderItemList();
  checkDpi(obj);
  updateInfoBar();
  updateSummary();
  pushUndo();
}

/* Debounced UI rebuild — during drag/scale/rotate the mm values update
   dozens of times per second.  We sync the raw numbers immediately (so
   they're correct when the gesture ends) but defer the expensive DOM
   rebuilds to a single requestAnimationFrame + trailing timeout. */
let _syncUiRafId = null;
let _syncUiTimer = null;
function _debouncedUiRebuild(){
  if(_syncUiRafId) cancelAnimationFrame(_syncUiRafId);
  clearTimeout(_syncUiTimer);
  _syncUiRafId = requestAnimationFrame(()=>{
    renderSelectedPanel();
    updateInfoBar();
    _syncUiRafId = null;
  });
  // Rebuild item list less often — it's heavier (thumbnails)
  _syncUiTimer = setTimeout(()=>{ renderItemList(); }, 200);
}

function syncMmFromPx(obj){
  // Use axis-aligned bounding rect so center-origin and rotated tiles stay consistent.
  const r = obj.getBoundingRect(true, true);
  obj._mmLeft = r.left / displayPxPerMm;
  obj._mmTop  = r.top  / displayPxPerMm;
  obj._mmW    = r.width  / displayPxPerMm;
  obj._mmH    = r.height / displayPxPerMm;
  _debouncedUiRebuild();
  // NB: checkDpi is fired from placeImage and setSizeMm, not here — moving
  // triggers syncMmFromPx dozens of times and we don't want toast spam.
}

function findFreeSpotOrNull(mmW, mmH){
  if(mmW > state.sheet.w || mmH > state.sheet.h) return null;
  // Dynamic step: fine enough to find tight gaps, coarse enough that
  // scanning a full 55×100 sheet stays under a few ms even with many items.
  const step = Math.max(2, Math.floor(Math.min(mmW, mmH) / 4) || 2);
  const maxY = state.sheet.h - mmH;
  const maxX = state.sheet.w - mmW;
  for(let y=0; y<=maxY; y+=step){
    for(let x=0; x<=maxX; x+=step){
      if(!overlapsAny(x,y,mmW,mmH)) return {x,y};
    }
  }
  return null;
}

function findFreeSpot(mmW, mmH){
  return findFreeSpotOrNull(mmW, mmH) || {x:0,y:0};
}

/* Smart rotation-aware batch packer — uses bestLayout (same algorithm
   as the "vul vel" button) for dense packing, then filters out slots
   that overlap existing obstacles, then fills any remaining gaps with
   a fine-grained fallback scan (still rotation-aware).

   Takes optional `existingBoxes` parameter so callers can run the packer
   without relying on canvas.getObjects() — useful when pre-computing
   layouts for overflow sheets.

   Returns an array of { x, y, w, h, rotated } slots in mm. A `rotated`
   slot has swapped dimensions: w = original mmH, h = original mmW. The
   caller must place the clone with angle=90 and center origin. */
function packSpotsSmart(mmW, mmH, count, existingBoxes){
  if(count <= 0) return [];
  const sheetW = state.sheet.w, sheetH = state.sheet.h;
  const nativeFits = mmW <= sheetW && mmH <= sheetH;
  const rotatedFits = mmH <= sheetW && mmW <= sheetH;
  if(!nativeFits && !rotatedFits) return [];

  const gap = state.gapMm || 0;

  // Snapshot obstacle boxes (expanded by gap) if caller didn't supply any.
  let existing = existingBoxes;
  if(!existing){
    existing = [];
    const objs = canvas.getObjects();
    for(let i=0; i<objs.length; i++){
      const o = objs[i];
      if(!o._mmW) continue;
      existing.push({
        x1: o._mmLeft - gap, y1: o._mmTop - gap,
        x2: o._mmLeft + o._mmW + gap, y2: o._mmTop + o._mmH + gap,
      });
    }
  }

  const results = [];
  const placed = [];

  const overlapsAnyBox = (x, y, w, h)=>{
    const bx2 = x + w, by2 = y + h;
    for(let i=0; i<existing.length; i++){
      const b = existing[i];
      if(bx2 > b.x1 && x < b.x2 && by2 > b.y1 && y < b.y2) return true;
    }
    for(let i=0; i<placed.length; i++){
      const b = placed[i];
      if(bx2 > b.x1 && x < b.x2 && by2 > b.y1 && y < b.y2) return true;
    }
    return false;
  };

  const pushSpot = (x, y, w, h, rotated)=>{
    results.push({ x, y, w, h, rotated });
    placed.push({
      x1: x - gap, y1: y - gap,
      x2: x + w + gap, y2: y + h + gap,
    });
  };

  // Step 1: bestLayout gives a dense rotation-aware layout for an empty
  // sheet. We filter its slots against existing obstacles.
  const layout = bestLayout(mmW, mmH, gap, sheetW, sheetH);
  for(let i=0; i<layout.length && results.length < count; i++){
    const p = layout[i];
    if(!overlapsAnyBox(p.x, p.y, p.w, p.h)){
      pushSpot(p.x, p.y, p.w, p.h, p.rotated);
    }
  }

  // Step 2: fine-grained fallback scan. Tries both orientations to
  // squeeze extra copies into odd corners left by obstacles.
  if(results.length < count){
    const tryScan = (w, h, rotated)=>{
      if(w > sheetW || h > sheetH) return;
      if(results.length >= count) return;
      const step = Math.max(2, Math.floor(Math.min(w, h) / 4) || 2);
      const maxY = sheetH - h;
      const maxX = sheetW - w;
      for(let y=0; y<=maxY && results.length < count; y+=step){
        for(let x=0; x<=maxX && results.length < count; x+=step){
          if(!overlapsAnyBox(x, y, w, h)){
            pushSpot(x, y, w, h, rotated);
            x += Math.max(0, Math.floor(w / step) * step - step);
          }
        }
      }
    };
    tryScan(mmW, mmH, false);
    tryScan(mmH, mmW, true);
  }

  return results;
}

/* Back-compat wrapper — caller code that used packSpotsOnCurrentSheet
   continues to work. */
function packSpotsOnCurrentSheet(mmW, mmH, count){
  return packSpotsSmart(mmW, mmH, count);
}

/* ensureSpotOnAnySheet — synchronous helper. Tries the current tab first;
   if full AND we're in multi-sheet mode (55×100 DTF only), saves the current
   tab, pushes a NEW blank tab, switches to it, and returns a spot on it.
   Returns null if we're single-sheet and the sheet is full.
   Callers can safely call canvas.add(...) right after this returns because
   loadTabState on a tab with json=null runs fully synchronously. */
function ensureSpotOnAnySheet(mmW, mmH){
  let spot = findFreeSpotOrNull(mmW, mmH);
  if(spot) return spot;

  if(!isMultiSheet()){
    toast(t('sheetFullNoSpill'), 'error');
    return null;
  }

  saveCurrentTabState();
  state.sheetTabs.push({ json:null, fillTemplate:null });
  const newIdx = state.sheetTabs.length - 1;
  // tab.json is null here, so loadTabState runs done() synchronously.
  loadTabState(newIdx);
  toast(t('spillToNew')(newIdx+1), 'info');
  spot = findFreeSpotOrNull(mmW, mmH) || { x:0, y:0 };
  return spot;
}

// Check if a live object overlaps any OTHER object on the canvas.
function hasOverlap(obj){
  const gap = state.gapMm || 0;
  const ax1 = obj._mmLeft - gap, ay1 = obj._mmTop - gap;
  const ax2 = obj._mmLeft + obj._mmW + gap, ay2 = obj._mmTop + obj._mmH + gap;
  return canvas.getObjects().some(o=>{
    if(o === obj || !o._mmW) return false;
    const bx1 = o._mmLeft, by1 = o._mmTop;
    const bx2 = o._mmLeft + o._mmW, by2 = o._mmTop + o._mmH;
    return !(ax2 <= bx1 || ax1 >= bx2 || ay2 <= by1 || ay1 >= by2);
  });
}

function overlapsAny(x,y,w,h){
  const gap = state.gapMm || 0;
  return canvas.getObjects().some(o=>{
    if(!o._mmW) return false;
    const ox1 = o._mmLeft - gap;
    const oy1 = o._mmTop - gap;
    const ox2 = o._mmLeft + o._mmW + gap;
    const oy2 = o._mmTop + o._mmH + gap;
    return !(x+w <= ox1 || x >= ox2 || y+h <= oy1 || y >= oy2);
  });
}

function calcEffectiveDpi(obj){
  // Pure vector SVG without embedded raster → infinite resolution.
  if(obj.type === 'group' && obj._svgSource && !obj._embeddedRasterW) return Infinity;
  // SVG with embedded raster → DPI based on the raster dimensions vs print size.
  if(obj.type === 'group' && obj._svgSource && obj._embeddedRasterW){
    return (obj._embeddedRasterW / obj._mmW) * MM_PER_INCH;
  }
  return (obj._naturalW / obj._mmW) * MM_PER_INCH;
}
function dpiStatus(dpi){
  if(!isFinite(dpi)) return {label:'vector ✓', cls:'dpi-ok'};
  if(dpi >= 300) return {label:Math.round(dpi)+' dpi', cls:'dpi-ok'};
  if(dpi >= 150) return {label:Math.round(dpi)+' dpi', cls:'dpi-warn'};
  return {label:Math.round(dpi)+' dpi', cls:'dpi-bad'};
}
// Track which logos we've already warned about so the sticky DPI toast only
// appears once per logo. The user actively dismisses the toast, which releases
// the lock for that logo.
const warnedDpiIds = new Set();
function checkDpi(obj){
  if(!obj) return;
  const key = obj._originalId || obj._id;
  if(key == null) return;
  const dpi = calcEffectiveDpi(obj);
  if(!isFinite(dpi) || dpi >= 150) return;
  if(warnedDpiIds.has(key)) return;
  warnedDpiIds.add(key);
  toast(
    `⚠️ ${t('lowDpiWarn')}: ${Math.round(dpi)} DPI. ${t('lowDpiMore')}`,
    'warn',
    0, // sticky — user closes it
    ()=>{ warnedDpiIds.delete(key); }
  );
}


/* =========================================================
   COLOR UTILITIES
   ========================================================= */
// Convert hex (#rrggbb) → {r,g,b}
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  const n = parseInt(hex,16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
// Convert {r,g,b} → #rrggbb
function rgbToHex(r,g,b){
  return '#'+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
}
// Convert {r,g,b} → {c,m,y,k} (0-100)
function rgbToCmyk(r,g,b){
  const r1=r/255, g1=g/255, b1=b/255;
  const k=1-Math.max(r1,g1,b1);
  if(k>=1) return {c:0,m:0,y:0,k:100};
  return {
    c:Math.round(((1-r1-k)/(1-k))*100),
    m:Math.round(((1-g1-k)/(1-k))*100),
    y:Math.round(((1-b1-k)/(1-k))*100),
    k:Math.round(k*100)
  };
}
// Convert {c,m,y,k} (0-100) → {r,g,b}
function cmykToRgb(c,m,y,k){
  const c1=c/100, m1=m/100, y1=y/100, k1=k/100;
  return {
    r:Math.round(255*(1-c1)*(1-k1)),
    g:Math.round(255*(1-m1)*(1-k1)),
    b:Math.round(255*(1-y1)*(1-k1))
  };
}

// Extract unique fill/stroke colors from an SVG fabric group.
function extractSvgColors(group){
  const colors = new Map(); // normalized hex → count
  if(!group || !group._objects) return colors;
  const walk = (objs)=>{
    objs.forEach(o=>{
      if(o._objects) walk(o._objects);
      ['fill','stroke'].forEach(prop=>{
        const v = o[prop];
        if(!v || v === 'none' || v === 'transparent') return;
        let hex;
        if(typeof v === 'string' && v.startsWith('#')){
          hex = v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.toLowerCase();
        } else if(typeof v === 'string' && v.startsWith('rgb')){
          const m = v.match(/(\d+)/g);
          if(m && m.length>=3) hex = rgbToHex(+m[0],+m[1],+m[2]);
        } else return;
        if(hex){
          colors.set(hex, (colors.get(hex)||0)+1);
        }
      });
    });
  };
  walk(group._objects);
  return colors;
}

// Replace a specific color in all paths of an SVG fabric group.
function recolorSvgPaths(group, oldHex, newHex){
  if(!group || !group._objects) return;
  const old = oldHex.toLowerCase();
  const walk = (objs)=>{
    objs.forEach(o=>{
      if(o._objects) walk(o._objects);
      ['fill','stroke'].forEach(prop=>{
        const v = o[prop];
        if(!v || typeof v !== 'string') return;
        let hex;
        if(v.startsWith('#')){
          hex = v.length===4 ? '#'+v[1]+v[1]+v[2]+v[2]+v[3]+v[3] : v.toLowerCase();
        } else if(v.startsWith('rgb')){
          const m = v.match(/(\d+)/g);
          if(m && m.length>=3) hex = rgbToHex(+m[0],+m[1],+m[2]);
        }
        if(hex === old) o.set(prop, newHex);
      });
    });
  };
  walk(group._objects);
  group.dirty = true;
  canvas.requestRenderAll();
}

// ---- Raster color detection & replacement ----
const RASTER_COLOR_TOLERANCE = 60; // Euclidean RGB distance for recolor matching

// Extract dominant colors from a raster fabric.Image.
// Two-pass clustering: first collect rough clusters, then merge small ones
// into the nearest large cluster. Skips near-white (anti-alias/bg) pixels.
// Returns a Map of hex → pixel count, max 6 representative colors.
function extractRasterColors(obj){
  const result = new Map();
  if(!obj || obj.type !== 'image') return result;
  const el = obj.getElement();
  const tmp = document.createElement('canvas');
  const w = el.naturalWidth || el.width || 1;
  const h = el.naturalHeight || el.height || 1;
  const maxPixels = 200000;
  const stride = Math.max(1, Math.round(Math.sqrt((w*h)/maxPixels)));
  tmp.width = w; tmp.height = h;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;

  // Pass 1: collect clusters with generous tolerance
  const CLUSTER_TOL = 80;
  const tolSq = CLUSTER_TOL * CLUSTER_TOL;
  const clusters = []; // [{r,g,b,count,sumR,sumG,sumB}]
  let whiteCount = 0;  // track near-white pixels separately
  let totalSampled = 0;

  for(let y = 0; y < h; y += stride){
    for(let x = 0; x < w; x += stride){
      const i = (y * w + x) * 4;
      if(data[i+3] < 30) continue; // skip transparent
      totalSampled++;
      const pr = data[i], pg = data[i+1], pb = data[i+2];
      // Count near-white pixels but don't skip — add as cluster if dominant
      if(pr > 240 && pg > 240 && pb > 240){ whiteCount++; continue; }

      // Find closest existing cluster
      let bestIdx = -1, bestDist = Infinity;
      for(let c = 0; c < clusters.length; c++){
        const cl = clusters[c];
        const dr = pr-cl.r, dg = pg-cl.g, db = pb-cl.b;
        const dist = dr*dr + dg*dg + db*db;
        if(dist < bestDist){ bestDist = dist; bestIdx = c; }
      }
      if(bestIdx >= 0 && bestDist <= tolSq){
        const cl = clusters[bestIdx];
        cl.sumR += pr; cl.sumG += pg; cl.sumB += pb;
        cl.count++;
        // Update center to running average for better clustering
        cl.r = Math.round(cl.sumR / cl.count);
        cl.g = Math.round(cl.sumG / cl.count);
        cl.b = Math.round(cl.sumB / cl.count);
      } else {
        clusters.push({r:pr, g:pg, b:pb, count:1, sumR:pr, sumG:pg, sumB:pb});
      }
    }
  }

  // If white pixels are significant (>10% of non-transparent), include as cluster
  if(whiteCount > totalSampled * 0.10){
    clusters.push({r:255, g:255, b:255, count:whiteCount, sumR:255*whiteCount, sumG:255*whiteCount, sumB:255*whiteCount});
  }

  // Pass 2: merge small clusters into nearest large one
  clusters.sort((a,b) => b.count - a.count);
  const totalPixels = clusters.reduce((s,c) => s + c.count, 0);
  const minSize = totalPixels * 0.02; // clusters under 2% get merged
  const merged = [];

  for(const cl of clusters){
    if(cl.count >= minSize || merged.length === 0){
      merged.push(cl);
    } else {
      // Find nearest merged cluster
      let bestIdx = 0, bestDist = Infinity;
      for(let m = 0; m < merged.length; m++){
        const mc = merged[m];
        const dr = cl.r-mc.r, dg = cl.g-mc.g, db = cl.b-mc.b;
        const dist = dr*dr + dg*dg + db*db;
        if(dist < bestDist){ bestDist = dist; bestIdx = m; }
      }
      merged[bestIdx].count += cl.count;
    }
  }

  // Pass 3: merge remaining clusters that are close to each other.
  // This catches shadow/highlight variants of the same base color
  // (e.g. dark-red and mid-red) while keeping truly distinct colors apart.
  const MERGE_DIST_SQ = 120 * 120; // generous for shade variants
  merged.sort((a,b) => b.count - a.count);
  const final = [];
  for(const cl of merged){
    let absorbed = false;
    for(const fc of final){
      const dr = cl.r-fc.r, dg = cl.g-fc.g, db = cl.b-fc.b;
      if(dr*dr + dg*dg + db*db <= MERGE_DIST_SQ){
        fc.count += cl.count; // absorb into dominant cluster (keep its color)
        absorbed = true;
        break;
      }
    }
    if(!absorbed) final.push(cl);
  }

  // Also skip near-black if there's a dominant color (likely shadow/outline)
  const hasColor = final.some(c => (c.r > 40 || c.g > 40 || c.b > 40));
  const filtered = hasColor
    ? final.filter(c => !(c.r < 25 && c.g < 25 && c.b < 25) || c.count > totalPixels * 0.15)
    : final;

  // Return max 4 colors
  filtered.sort((a,b) => b.count - a.count);
  filtered.slice(0, 4).forEach(cl => {
    result.set(rgbToHex(cl.r, cl.g, cl.b), cl.count);
  });
  return result;
}

// Replace all pixels within TOLERANCE of oldColor with exactly newColor.
// Single-pass: every matching pixel becomes the exact same new color.
function recolorRaster(obj, oldHex, newHex){
  if(!obj || obj.type !== 'image') return;
  const oldRgb = hexToRgb(oldHex);
  const newRgb = hexToRgb(newHex);
  const tol = RASTER_COLOR_TOLERANCE;
  const tolSq = tol * tol;
  const el = obj.getElement();
  const tmp = document.createElement('canvas');
  tmp.width = el.naturalWidth || el.width;
  tmp.height = el.naturalHeight || el.height;
  const ctx = tmp.getContext('2d');
  ctx.drawImage(el, 0, 0);
  const imgData = ctx.getImageData(0, 0, tmp.width, tmp.height);
  const px = imgData.data;
  for(let i = 0; i < px.length; i += 4){
    if(px[i+3] < 30) continue;
    const dr = px[i] - oldRgb.r;
    const dg = px[i+1] - oldRgb.g;
    const db = px[i+2] - oldRgb.b;
    if(dr*dr + dg*dg + db*db <= tolSq){
      px[i]   = newRgb.r;
      px[i+1] = newRgb.g;
      px[i+2] = newRgb.b;
    }
  }
  ctx.putImageData(imgData, 0, 0);
  fabric.Image.fromURL(tmp.toDataURL('image/png'), newImg=>{
    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle, flipX: obj.flipX, flipY: obj.flipY,
      scaleX: obj.scaleX, scaleY: obj.scaleY,
    });
    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = tmp.width;
    newImg._naturalH = tmp.height;
    newImg._mmW = obj._mmW;
    newImg._mmH = obj._mmH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;
    newImg._vectorOrigin = obj._vectorOrigin;
    attachObjListeners(newImg);
    // Suppress panel rebuild so the color picker stays open
    _suppressPanelRebuild = true;
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg);
    canvas.requestRenderAll();
    _suppressPanelRebuild = false;
    state.selectedId = newImg._id;
    renderItemList();
    toast(t('colorChanged'), 'success', 2000);
  });
}

/* =========================================================
   SELECTION / SELECTED PANEL
   ========================================================= */
let _suppressPanelRebuild = false;
canvas.on('selection:created', e=>{ state.selectedId = e.selected[0]?._id; updateBgRemoveBtn(); updateFillBtn(); if(!_suppressPanelRebuild) renderSelectedPanel(); renderItemList(); });
canvas.on('selection:updated', e=>{ state.selectedId = e.selected[0]?._id; updateBgRemoveBtn(); updateFillBtn(); if(!_suppressPanelRebuild) renderSelectedPanel(); renderItemList(); });
canvas.on('selection:cleared', ()=>{ state.selectedId = null; updateBgRemoveBtn(); updateFillBtn(); renderSelectedPanel(); renderItemList(); });

function getSelectedObj(){ return canvas.getActiveObject(); }

function renderSelectedPanel(){
  const panel = document.getElementById('selectedPanel');
  const section = document.getElementById('selectedSection');
  const obj = getSelectedObj();

  // Check for multi-select
  if(obj && obj.type === 'activeSelection'){
    const count = obj._objects?.length || 0;
    panel.innerHTML = `
      <div style="padding:12px;background:var(--bg-light);border-radius:8px;text-align:center;margin-bottom:12px">
        <p style="margin:0;font-size:0.9rem;color:var(--text);font-weight:700">${count} ${t('selectMultiple')}</p>
      </div>
      <div class="toolbar" style="margin-bottom:14px">
        <button class="tool-btn" data-act="multi-rot" style="flex:1">${t('rotateMultiple')}</button>
        <button class="tool-btn" data-act="multi-dup" style="flex:1">${t('duplicateMultiple')}</button>
        <button class="tool-btn" data-act="multi-del" style="flex:1;background:#fee2e2;color:#dc2626">${t('deleteMultiple')}</button>
      </div>
    `;
    if(section) section.classList.add('highlight');
    return;
  }

  if(!obj || !obj._mmW){
    panel.innerHTML = `<p class="empty">${t('selectEmpty')}</p>`;
    if(section) section.classList.remove('highlight');
    return;
  }
  // Flash gradient border on selection
  if(section){
    section.classList.remove('highlight');
    void section.offsetWidth;
    section.classList.add('highlight');
  }
  const isVector = !!(obj.type === 'group' && obj._svgSource);
  const hasEmbeddedRaster = !!(isVector && obj._embeddedRasterW);
  const isPureVector = isVector && !hasEmbeddedRaster;
  const dpi = dpiStatus(calcEffectiveDpi(obj));
  const unit = state.unit;
  const w = unit==='mm' ? obj._mmW.toFixed(1) : (obj._mmW/10).toFixed(2);
  const h = unit==='mm' ? obj._mmH.toFixed(1) : (obj._mmH/10).toFixed(2);
  const curAngle = Math.round(((obj.angle||0)%360+360)%360);
  const isRaster = (obj.type === 'image');
  const thrVal = document.getElementById('bgThreshold')?.value || 240;

  panel.innerHTML = `
    <!-- ── Quick actions ── -->
    <div class="toolbar" style="margin-bottom:14px">
      <button class="tool-btn" data-act="rot90">${t('tbRotate')}</button>
      <button class="tool-btn" data-act="dup">${t('tbDup')}</button>
      <button class="tool-btn" data-act="del" style="background:#fee2e2;color:#dc2626">${t('tbDel')}</button>
    </div>

    <!-- ── TRANSFORM group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('sectionTransform')}</div>

      <div class="panel-row-label">${t('logoSize')}</div>
      <div class="size-row" style="margin-bottom:10px">
        <div class="field">
          <label>${t('width')} (${unit})</label>
          <input type="number" step="0.1" id="inpW" value="${w}">
        </div>
        <button type="button" class="ratio-lock${_ratioLocked?' active':''}" id="ratioLockBtn" title="${_ratioLocked?t('ratioLock'):t('ratioUnlock')}" aria-label="${t('ratioLock')}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            ${_ratioLocked?'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>':'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M17 11V7a5 5 0 0 0-10 0"></path>'}
          </svg>
        </button>
        <div class="field">
          <label>${t('height')} (${unit})</label>
          <input type="number" step="0.1" id="inpH" value="${h}">
        </div>
      </div>

      <div class="panel-row-label">${t('rotation')}</div>
      <div class="field" style="margin-bottom:0">
        <div class="rot-slider-head">
          <label style="margin:0">${t('rotation')}</label>
          <div class="rot-val" id="rotVal">${curAngle}°</div>
        </div>
        <input type="range" min="0" max="360" step="1" value="${curAngle}" id="rotSlider" class="rot-slider">
        <div class="rot-chips" id="rotChips">
          <button data-rot="0">0°</button>
          <button data-rot="90">90°</button>
          <button data-rot="180">180°</button>
          <button data-rot="270">270°</button>
        </div>
      </div>
    </div>

    <!-- ── APPEARANCE group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('sectionAppearance')}</div>

      <div class="panel-row-label">${t('colorsLabel')}</div>
      <div class="field" id="colorSection" style="margin-bottom:0"></div>

      ${isRaster ? `
      <div class="panel-row-label" style="margin-top:10px">${t('bgRemove')}</div>
      <div class="field" style="margin-bottom:0">
        <button class="btn btn-grad" id="bgRemoveBtn" style="width:100%;justify-content:center">${t('bgRemove')}</button>
        <div style="margin-top:8px">
          <label style="font-size:.78rem">${t('thresholdLabel')}: <span id="thrVal">${thrVal}</span></label>
          <input type="range" class="slider" id="bgThreshold" min="180" max="255" value="${thrVal}">
          <p class="dpi-hint" style="margin-top:4px">${t('thresholdHelp')}</p>
        </div>
      </div>` : ''}
    </div>

    <!-- ── INFO group ── -->
    <div class="panel-group">
      <div class="panel-group-title">${t('sectionInfo')}</div>

      <div class="panel-row-label">${isPureVector ? t('quality') : t('dpiAt')}</div>
      <div class="field" style="margin-bottom:0">
        <div><span class="dpi-pill ${dpi.cls}">${dpi.label}</span></div>
        ${hasEmbeddedRaster ? `<p class="dpi-hint">${t('embeddedRasterHint')}</p>` : ''}
        ${!isVector ? `<p class="dpi-hint">${t('dpiHint')}</p>` : ''}
      </div>
    </div>
  `;

  /* ── Wiring ── */
  panel.querySelectorAll('.toolbar [data-act]').forEach(b=>{
    b.onclick = ()=>actOnSelected(b.dataset.act);
  });
  document.getElementById('inpW').onchange = e=>setSizeMm('w', parseFloat(e.target.value));
  document.getElementById('inpH').onchange = e=>setSizeMm('h', parseFloat(e.target.value));

  // Ratio lock button
  const lockBtn = document.getElementById('ratioLockBtn');
  if(lockBtn){
    lockBtn.classList.toggle('active', _ratioLocked);
    lockBtn.onclick = ()=>{
      _ratioLocked = !_ratioLocked;
      lockBtn.classList.toggle('active', _ratioLocked);
      lockBtn.title = _ratioLocked ? t('ratioLock') : t('ratioUnlock');
      // Update lock icon: locked vs unlocked
      lockBtn.innerHTML = _ratioLocked
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M17 11V7a5 5 0 0 0-10 0"></path></svg>';
      // Also toggle Fabric's interactive scaling lock on current object
      const cur = getSelectedObj();
      if(cur){
        cur.lockUniScaling = _ratioLocked;
        canvas.requestRenderAll();
      }
    };
  }

  // Bg remove (raster only)
  const bgBtn = document.getElementById('bgRemoveBtn');
  const bgThr = document.getElementById('bgThreshold');
  const thrValEl = document.getElementById('thrVal');
  if(bgBtn && bgThr){
    bgThr.oninput = e=>{ if(thrValEl) thrValEl.textContent = e.target.value; };
    bgBtn.onclick = ()=>{
      const curr = getSelectedObj();
      if(!curr || curr.type !== 'image') return;
      removeWhiteBg(curr, parseInt(bgThr.value, 10));
    };
  }

  // Colors
  buildColorEditor(obj, isVector);

  // Rotation slider — debounced like gap/threshold: live preview, delayed repack
  const slider = document.getElementById('rotSlider');
  const valEl  = document.getElementById('rotVal');
  const chips  = panel.querySelectorAll('#rotChips button');
  let rotTimer = null;
  const markActiveChip = (a)=>{
    chips.forEach(b=>b.classList.toggle('active', parseInt(b.dataset.rot,10) === a));
  };
  const applyRot = (a, immediate)=>{
    a = ((Math.round(a)%360)+360)%360;
    valEl.textContent = a + '°';
    slider.value = a;
    obj.rotate(a);
    canvas.requestRenderAll();
    markActiveChip(a);
    clearTimeout(rotTimer);
    if(immediate){
      syncMmFromPx(obj); clampObjToSheet(obj);
    } else {
      rotTimer = setTimeout(()=>{ syncMmFromPx(obj); clampObjToSheet(obj); }, 150);
    }
  };
  markActiveChip(curAngle);
  slider.addEventListener('input', e=> applyRot(parseInt(e.target.value, 10), false));
  slider.addEventListener('change', e=> applyRot(parseInt(e.target.value, 10), true));
  chips.forEach(b=>{
    b.onclick = ()=> applyRot(parseInt(b.dataset.rot,10), true);
  });
}

/* ---- Color editor injected into selected panel ---- */
function buildColorEditor(obj, isVector){
  const section = document.getElementById('colorSection');
  if(!section) return;

  if(isVector){
    // SVG: extract colors and show swatches
    const colors = extractSvgColors(obj);
    if(!colors.size){
      section.innerHTML = `<p class="color-hint">${t('colorNoColors')}</p>`;
      return;
    }
    const sorted = [...colors.entries()].sort((a,b)=>b[1]-a[1]);
    let html = `<p class="color-hint">${t('colorClickToChange')}</p><div class="color-swatches">`;
    sorted.forEach(([hex])=>{
      html += `<div class="color-swatch" data-hex="${hex}" style="background:${hex}" title="${hex}"></div>`;
    });
    html += `</div><div id="colorEditArea"></div>`;
    section.innerHTML = html;

    section.querySelectorAll('.color-swatch').forEach(sw=>{
      sw.onclick = ()=>{
        section.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
        sw.classList.add('active');
        showColorPicker(sw.dataset.hex, (newHex)=>{
          pushUndo();
          recolorSvgPaths(obj, sw.dataset.hex, newHex);
          invalidateThumb(obj._originalId || obj._id);
          sw.style.background = newHex;
          sw.dataset.hex = newHex;
          toast(t('colorChanged'), 'success', 2000);
        });
      };
    });
  } else {
    // Raster: detect dominant colors and allow replacement (same UX as SVG)
    const colors = extractRasterColors(obj);
    if(!colors.size){
      section.innerHTML = `<p class="color-hint">${t('colorNoColors')}</p>`;
      return;
    }
    const sorted = [...colors.entries()].sort((a,b)=>b[1]-a[1]);
    let html = `<p class="color-hint">${t('colorClickToChange')}</p><div class="color-swatches">`;
    sorted.forEach(([hex])=>{
      html += `<div class="color-swatch" data-hex="${hex}" style="background:${hex}" title="${hex}"></div>`;
    });
    html += `</div><div id="colorEditArea"></div>`;
    section.innerHTML = html;

    section.querySelectorAll('.color-swatch').forEach(sw=>{
      sw.onclick = ()=>{
        section.querySelectorAll('.color-swatch').forEach(s=>s.classList.remove('active'));
        sw.classList.add('active');
        showColorPicker(sw.dataset.hex, (newHex)=>{
          pushUndo();
          // Use getSelectedObj() — the fabric object changes after pixel replacement
          const current = getSelectedObj();
          if(current){
            recolorRaster(current, sw.dataset.hex, newHex);
            invalidateThumb(current._originalId || current._id);
          }
          sw.style.background = newHex;
          sw.dataset.hex = newHex;
        });
      };
    });
  }
}

// Internal state for the active color picker
let _pickerMode = 'hex'; // 'hex' | 'rgb' | 'cmyk'
let _pickerHex = '#000000';
let _pickerCallback = null;

function getCurrentPickerHex(){ return _pickerHex; }

function showColorPicker(initialHex, onChange, rasterMode){
  _pickerHex = initialHex || '#000000';
  _pickerCallback = onChange || null;
  const area = document.getElementById('colorEditArea');
  if(!area) return;
  renderPickerUI(area, rasterMode);
}

function renderPickerUI(area, rasterMode){
  const rgb = hexToRgb(_pickerHex);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  let html = `
    <div class="color-picker-row">
      <input type="color" id="cpNative" value="${_pickerHex}">
      <span style="font-size:.78rem;font-weight:600;color:var(--text)">${_pickerHex}</span>
    </div>
    <div class="color-mode-tabs">
      <button data-mode="hex" class="${_pickerMode==='hex'?'active':''}">HEX</button>
      <button data-mode="rgb" class="${_pickerMode==='rgb'?'active':''}">RGB</button>
      <button data-mode="cmyk" class="${_pickerMode==='cmyk'?'active':''}">CMYK</button>
    </div>`;

  if(_pickerMode === 'hex'){
    html += `<div class="color-input-group"><label>#</label><input class="hex-input" id="cpHex" value="${_pickerHex.replace('#','')}" maxlength="6"></div>`;
  } else if(_pickerMode === 'rgb'){
    html += `<div class="color-input-group">
      <label>R</label><input type="number" id="cpR" min="0" max="255" value="${rgb.r}">
      <label>G</label><input type="number" id="cpG" min="0" max="255" value="${rgb.g}">
      <label>B</label><input type="number" id="cpB" min="0" max="255" value="${rgb.b}">
    </div>`;
  } else {
    html += `<div class="color-input-group">
      <label>C</label><input type="number" id="cpC" min="0" max="100" value="${cmyk.c}">
      <label>M</label><input type="number" id="cpM" min="0" max="100" value="${cmyk.m}">
      <label>Y</label><input type="number" id="cpY" min="0" max="100" value="${cmyk.y}">
      <label>K</label><input type="number" id="cpK" min="0" max="100" value="${cmyk.k}">
    </div>`;
  }

  html += `<button class="color-apply-btn" id="cpApply" style="width:100%;margin-top:8px;padding:8px 14px;font-size:.85rem">${t('colorApply')}</button>`;

  area.innerHTML = html;

  // Mode tabs
  area.querySelectorAll('.color-mode-tabs button').forEach(b=>{
    b.onclick = ()=>{ _pickerMode = b.dataset.mode; renderPickerUI(area, rasterMode); };
  });

  // Native color input — update on 'change' (picker closed) to avoid
  // re-rendering the DOM while the picker is still open.
  const native = document.getElementById('cpNative');
  if(native){
    native.oninput = e=>{ _pickerHex = e.target.value; };
    native.onchange = e=>{ _pickerHex = e.target.value; renderPickerUI(area, rasterMode); };
  }

  // HEX input
  const hexIn = document.getElementById('cpHex');
  if(hexIn) hexIn.onchange = e=>{
    let v = e.target.value.replace(/[^0-9a-fA-F]/g,'');
    if(v.length===6){ _pickerHex = '#'+v.toLowerCase(); renderPickerUI(area, rasterMode); }
  };

  // RGB inputs
  ['R','G','B'].forEach(ch=>{
    const el = document.getElementById('cp'+ch);
    if(el) el.onchange = ()=>{
      const r = parseInt(document.getElementById('cpR')?.value||0);
      const g = parseInt(document.getElementById('cpG')?.value||0);
      const b = parseInt(document.getElementById('cpB')?.value||0);
      _pickerHex = rgbToHex(r,g,b);
      renderPickerUI(area, rasterMode);
    };
  });

  // CMYK inputs
  ['C','M','Y','K'].forEach(ch=>{
    const el = document.getElementById('cp'+ch);
    if(el) el.onchange = ()=>{
      const c = parseInt(document.getElementById('cpC')?.value||0);
      const m = parseInt(document.getElementById('cpM')?.value||0);
      const y = parseInt(document.getElementById('cpY')?.value||0);
      const k = parseInt(document.getElementById('cpK')?.value||0);
      const rgb = cmykToRgb(c,m,y,k);
      _pickerHex = rgbToHex(rgb.r, rgb.g, rgb.b);
      renderPickerUI(area, rasterMode);
    };
  });

  // Apply button (SVG mode only)
  const applyBtn = document.getElementById('cpApply');
  if(applyBtn && _pickerCallback){
    applyBtn.onclick = ()=>{ _pickerCallback(_pickerHex); };
  }
}

let _ratioLocked = true; // aspect ratio lock — default ON

function setSizeMm(dim, val){
  const obj = getSelectedObj();
  if(!obj) return;
  if(state.unit==='cm') val *= 10;
  if(_ratioLocked){
    const ratio = obj._mmW / obj._mmH;
    if(dim==='w'){ obj._mmW = val; obj._mmH = val / ratio; }
    else { obj._mmH = val; obj._mmW = val * ratio; }
  } else {
    if(dim==='w') obj._mmW = val;
    else obj._mmH = val;
  }
  obj.scaleX = (obj._mmW * displayPxPerMm) / obj.width;
  obj.scaleY = (obj._mmH * displayPxPerMm) / obj.height;
  obj.setCoords();
  canvas.requestRenderAll();
  renderSelectedPanel();
  renderItemList();
  updateInfoBar();
  checkDpi(obj);
  pushUndo();
}

function actOnSelected(act){
  const obj = getSelectedObj();
  if(!obj) return;

  // Multi-select actions
  if(obj.type === 'activeSelection'){
    const objs = obj._objects || [];
    switch(act){
      case 'multi-rot':
        objs.forEach(o => { o.rotate(((o.angle||0)+90)%360); syncMmFromPx(o); });
        canvas.requestRenderAll();
        pushUndo();
        break;
      case 'multi-dup':
        objs.forEach(o => duplicate(o));
        break;
      case 'multi-del':
        objs.forEach(o => canvas.remove(o));
        canvas.requestRenderAll();
        canvas.discardActiveObject();
        renderItemList();
        renderSelectedPanel();
        updateInfoBar();
        pushUndo();
        break;
    }
    return;
  }

  // Single-select actions
  switch(act){
    case 'rot90': obj.rotate(((obj.angle||0)+90)%360); canvas.requestRenderAll(); syncMmFromPx(obj); pushUndo(); break;
    case 'dup':   duplicate(obj); break;
    case 'del':   removeObj(obj); break;
  }
}

function duplicate(obj){
  // Capture needed props BEFORE any tab switch so we don't lose the source.
  const mmW = obj._mmW, mmH = obj._mmH;
  const angle = obj.angle || 0;
  const srcProps = {
    _originalId: obj._originalId,
    _name: obj._name,
    _naturalW: obj._naturalW,
    _naturalH: obj._naturalH,
  };
  const natW = obj.width, natH = obj.height;

  // For raster images we can clone synchronously by reusing the existing
  // HTMLImageElement. For SVG groups we fall back to the async enliven path.
  if(obj.type === 'image'){
    const imgEl = obj.getElement();
    const spot = ensureSpotOnAnySheet(mmW, mmH);
    if(!spot) return;
    const clone = new fabric.Image(imgEl, {
      originX:'left', originY:'top',
      angle, flipX:false, flipY:false,
      scaleX: (mmW * displayPxPerMm) / natW,
      scaleY: (mmH * displayPxPerMm) / natH,
      left: spot.x * displayPxPerMm,
      top:  spot.y * displayPxPerMm,
    });
    clone._id = ++idCounter;
    clone._originalId = srcProps._originalId;
    clone._name = srcProps._name;
    clone._naturalW = srcProps._naturalW;
    clone._naturalH = srcProps._naturalH;
    clone._mmW = mmW;
    clone._mmH = mmH;
    clone._mmLeft = spot.x;
    clone._mmTop  = spot.y;
    attachObjListeners(clone);
    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.requestRenderAll();
    renderItemList();
    updateInfoBar();
    updateSummary();
    pushUndo();
    return;
  }

  // SVG / group path — rebuild via JSON (async).
  const srcJson = obj.toJSON(FABRIC_EXTRA_PROPS);
  const spot = ensureSpotOnAnySheet(mmW, mmH);
  if(!spot) return;
  fabric.util.enlivenObjects([srcJson], ([clone])=>{
    clone._id = ++idCounter;
    clone._originalId = srcProps._originalId;
    clone._name = srcProps._name;
    clone._naturalW = srcProps._naturalW;
    clone._naturalH = srcProps._naturalH;
    clone._mmW = mmW;
    clone._mmH = mmH;
    clone._mmLeft = spot.x;
    clone._mmTop  = spot.y;
    clone.set({
      originX:'left', originY:'top',
      angle, flipX:false, flipY:false,
      scaleX: (mmW * displayPxPerMm) / natW,
      scaleY: (mmH * displayPxPerMm) / natH,
      left: spot.x * displayPxPerMm,
      top:  spot.y * displayPxPerMm,
    });
    attachObjListeners(clone);
    canvas.add(clone);
    canvas.setActiveObject(clone);
    canvas.requestRenderAll();
    renderItemList();
    updateInfoBar();
    updateSummary();
    pushUndo();
  });
}

function removeObj(obj){
  if(state.fillTemplate && obj._originalId === state.fillTemplate.originalId){
    state.fillTemplate = null;
  }
  canvas.remove(obj);
  renderItemList();
  renderSelectedPanel();
  updateInfoBar();
  pushUndo();
}

document.getElementById('clearBtn').onclick = ()=>{
  if(!canvas.getObjects().length) return;
  confirmModal(t('clearTitle'), t('clearBody')).then(ok=>{
    if(!ok) return;
    canvas.clear();
    state.fillTemplate = null;
    renderItemList();
    renderSelectedPanel();
    updateInfoBar();
    pushUndo();
    toast(t('clearDone'),'success');
  });
};

/* =========================================================
   ITEM LIST (grouped by _originalId)
   ========================================================= */
/* Thumbnail cache — keyed by _originalId, invalidated on recolor / resize */
const _thumbCache = new Map();
function invalidateThumb(originalId){ _thumbCache.delete(originalId); }
function invalidateAllThumbs(){ _thumbCache.clear(); }

function renderItemList(){
  const list = document.getElementById('itemList');
  const groups = new Map();
  canvas.getObjects().forEach(o=>{
    if(!o._mmW) return;
    const oid = o._originalId ?? o._id;
    if(!groups.has(oid)){
      groups.set(oid, { originalId:oid, name:o._name, objs:[], sampleObj:o, naturalW:o._naturalW, naturalH:o._naturalH });
    }
    groups.get(oid).objs.push(o);
  });

  // Compute GLOBAL counts across every tab so the item list reflects the
  // total number of copies, not just what's on the current sheet.
  const globalCounts = new Map();
  for(const [oid, g] of groups) globalCounts.set(oid, g.objs.length);
  const globalUniqueIds = new Set(groups.keys());
  let totalGlobalObjs = canvas.getObjects().filter(o=>o._mmW).length;
  for(let i=0; i<state.sheetTabs.length; i++){
    if(i === state.activeTab) continue;
    const tab = state.sheetTabs[i];
    if(!tab.json || !tab.json.objects) continue;
    for(const o of tab.json.objects){
      if(o._mmW == null) continue;
      totalGlobalObjs++;
      const oid = o._originalId ?? o._id;
      globalUniqueIds.add(oid);
      globalCounts.set(oid, (globalCounts.get(oid) || 0) + 1);
      // If this group isn't on the active canvas, create a placeholder entry
      // so it still appears in the item list with the correct global count.
      if(!groups.has(oid)){
        groups.set(oid, {
          originalId: oid, name: o._name || 'logo', objs: [],
          sampleObj: null, naturalW: o._naturalW, naturalH: o._naturalH,
          savedMmW: o._mmW, savedMmH: o._mmH,
        });
      }
    }
  }

  document.getElementById('itemCount').textContent = `(${globalUniqueIds.size} ${globalUniqueIds.size===1?t('logo'):t('logos')} · ${totalGlobalObjs} ${t('copies')})`;

  if(!groups.size){
    list.innerHTML = `<p class="empty">${t('listEmpty')}</p>`;
    updateSummary();
    return;
  }

  list.innerHTML = '';
  groups.forEach(g=>{
    const sample = g.sampleObj;
    const mmW = sample ? sample._mmW : (g.savedMmW || 0);
    const mmH = sample ? sample._mmH : (g.savedMmH || 0);
    const dpi = sample ? dpiStatus(calcEffectiveDpi(sample)) : { cls:'ok', label:'—' };
    const wmm = mmW.toFixed(0), hmm = mmH.toFixed(0);
    const wcm = (mmW/10).toFixed(1), hcm = (mmH/10).toFixed(1);
    const sizeLabel = state.unit==='mm' ? `${wmm}×${hmm} mm` : `${wcm}×${hcm} cm`;
    const isSelected = g.objs.some(o => o._id === state.selectedId);
    const globalCount = globalCounts.get(g.originalId) || g.objs.length;

    const row = document.createElement('div');
    row.className = 'item-row' + (isSelected ? ' selected' : '');
    row.innerHTML = `
      <div class="item-thumb"></div>
      <div class="item-info">
        <div class="name">${escapeHtml(g.name)}</div>
        <div class="meta">${sizeLabel} · <span class="dpi-pill ${dpi.cls}" style="font-size:.6rem">${dpi.label}</span></div>
      </div>
      <div class="count-stepper" data-oid="${g.originalId}">
        <button type="button" data-act="dec">−</button>
        <input type="number" min="1" value="${globalCount}" />
        <button type="button" data-act="inc">+</button>
      </div>
      <button type="button" class="row-del" title="${t('tbDel')}" aria-label="${t('tbDel')}"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    `;
    row.addEventListener('click', e=>{
      if(e.target.closest('.count-stepper')) return;
      if(e.target.closest('.row-del')) return;
      if(sample){
        canvas.setActiveObject(sample);
        state.selectedId = sample._id;
        canvas.requestRenderAll();
        renderSelectedPanel();
      }
      renderItemList();
    });
    const stepper = row.querySelector('.count-stepper');
    stepper.querySelector('[data-act="dec"]').onclick = ()=>changeGroupCount(g.originalId, globalCount - 1);
    stepper.querySelector('[data-act="inc"]').onclick = ()=>changeGroupCount(g.originalId, globalCount + 1);
    const inp = stepper.querySelector('input');
    inp.onchange = ()=>{
      const v = Math.max(1, parseInt(inp.value,10) || 1);
      changeGroupCount(g.originalId, v);
    };
    row.querySelector('.row-del').onclick = (e)=>{
      e.stopPropagation();
      if(state.fillTemplate && state.fillTemplate.originalId === g.originalId){
        state.fillTemplate = null;
      }
      // Remove on current tab AND every other saved tab so the group
      // disappears entirely across the whole order.
      g.objs.forEach(o => canvas.remove(o));
      removeGroupFromAllSavedTabs(g.originalId);
      cleanupEmptyOverflowTabs();
      if(g.objs.some(o => o._id === state.selectedId)) state.selectedId = null;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
      renderItemList();
      renderSelectedPanel();
      renderSheetTabs();
      updateInfoBar();
      updateSummary();
      updateFillBtn();
    };
    if(sample){
      const oid = g.originalId;
      if(_thumbCache.has(oid)){
        row.querySelector('.item-thumb').style.backgroundImage = `url(${_thumbCache.get(oid)})`;
      } else {
        try {
          const objPxW = sample.width * sample.scaleX;
          const objPxH = sample.height * sample.scaleY;
          const thumbTarget = 80;
          const thumbMult = Math.min(2, Math.max(0.3, thumbTarget / Math.max(objPxW, objPxH, 1)));
          const mini = sample.toDataURL({ format:'png', multiplier: thumbMult });
          _thumbCache.set(oid, mini);
          row.querySelector('.item-thumb').style.backgroundImage = `url(${mini})`;
        } catch(e){}
      }
    }
    list.appendChild(row);
  });
  updateSummary();
}

/* =========================================================
   CROSS-TAB GROUP HELPERS
   =========================================================
   Groups (identified by _originalId) span ALL sheet tabs. These helpers
   let changeGroupCount and renderItemList treat overflow tabs as a
   continuation of the current tab instead of a new "order". */

// Count how many copies of a group live on a non-active (saved) tab.
function countGroupOnSavedTab(tabIdx, originalId){
  const tab = state.sheetTabs[tabIdx];
  if(!tab || !tab.json || !tab.json.objects) return 0;
  let n = 0;
  for(const o of tab.json.objects){
    if(o._mmW != null && o._originalId === originalId) n++;
  }
  return n;
}

// Global count across the live canvas + every saved tab.
function countGroupGlobally(originalId){
  let n = 0;
  for(const o of canvas.getObjects()){
    if(o._mmW != null && o._originalId === originalId) n++;
  }
  for(let i=0; i<state.sheetTabs.length; i++){
    if(i === state.activeTab) continue;
    n += countGroupOnSavedTab(i, originalId);
  }
  return n;
}

// Build a serialized fabric.Image clone from a template POJO, positioned
// at the given slot. Returns a JSON-ready plain object ready to be pushed
// into tab.json.objects.
function buildSerializedClone(tplObj, slot, mmW, mmH, natW, natH, baseAngle, newId){
  const clone = JSON.parse(JSON.stringify(tplObj));
  const sx = (mmW * displayPxPerMm) / natW;
  const sy = (mmH * displayPxPerMm) / natH;
  clone.originX = 'center';
  clone.originY = 'center';
  clone.angle   = slot.rotated ? 90 : (baseAngle || 0);
  clone.flipX   = false;
  clone.flipY   = false;
  clone.scaleX  = sx;
  clone.scaleY  = sy;
  clone.left    = (slot.x + slot.w/2) * displayPxPerMm;
  clone.top     = (slot.y + slot.h/2) * displayPxPerMm;
  clone._id     = newId;
  clone._mmLeft = slot.x;
  clone._mmTop  = slot.y;
  clone._mmW    = slot.w;
  clone._mmH    = slot.h;
  return clone;
}

// Pack as many clones as possible onto a SAVED (non-active) tab and
// append them to tab.json.objects. Returns number of copies added.
function addClonesToSavedTab(tabIdx, tplObj, mmW, mmH, natW, natH, baseAngle, count){
  if(count <= 0) return 0;
  const tab = state.sheetTabs[tabIdx];
  if(!tab.json || !tab.json.objects){
    tab.json = { version: fabric.version, objects: [], background: null };
  }
  const gap = state.gapMm || 0;
  const obstacles = [];
  for(const o of tab.json.objects){
    if(o._mmW == null) continue;
    obstacles.push({
      x1: o._mmLeft - gap, y1: o._mmTop - gap,
      x2: o._mmLeft + o._mmW + gap, y2: o._mmTop + o._mmH + gap,
    });
  }
  const slots = packSpotsSmart(mmW, mmH, count, obstacles);
  for(const slot of slots){
    tab.json.objects.push(
      buildSerializedClone(tplObj, slot, mmW, mmH, natW, natH, baseAngle, ++idCounter)
    );
  }
  return slots.length;
}

// Remove up to `count` copies of a group from a saved tab. Removes the
// most-recently-added matches first. Returns number actually removed.
function removeClonesFromSavedTab(tabIdx, originalId, count){
  if(count <= 0) return 0;
  const tab = state.sheetTabs[tabIdx];
  if(!tab || !tab.json || !tab.json.objects) return 0;
  const matched = [];
  for(let j=0; j<tab.json.objects.length; j++){
    const o = tab.json.objects[j];
    if(o._mmW != null && o._originalId === originalId) matched.push(j);
  }
  const toKill = Math.min(count, matched.length);
  const killIdx = matched.slice(matched.length - toKill).sort((a,b)=>b-a);
  for(const idx of killIdx) tab.json.objects.splice(idx, 1);
  return toKill;
}

// Strip a group entirely from every saved tab (used by row delete).
function removeGroupFromAllSavedTabs(originalId){
  let total = 0;
  for(let i=0; i<state.sheetTabs.length; i++){
    if(i === state.activeTab) continue;
    total += removeClonesFromSavedTab(i, originalId, Infinity);
  }
  return total;
}

// Auto-drop empty overflow tabs (keep tab 0 and the active tab).
function cleanupEmptyOverflowTabs(){
  for(let i = state.sheetTabs.length - 1; i > 0; i--){
    if(i === state.activeTab) continue;
    const tab = state.sheetTabs[i];
    if(tab.json && tab.json.objects && tab.json.objects.length === 0){
      state.sheetTabs.splice(i, 1);
      if(state.activeTab > i) state.activeTab--;
    }
  }
}

/* changeGroupCount — global count editor.
   Strategy: REBUILD. For every count change (up or down) we:
     1. Build a template from any live or saved copy of the group.
     2. Wipe every existing copy from the live canvas + all saved tabs.
     3. Place `targetCount` copies starting on tab 0, filling each sheet
        densely via packSpotsSmart before moving to the next.
     4. Create new overflow tabs (multi-sheet sheets only) as needed.
     5. Drop any empty overflow tabs that remain.
   One code path for increment, decrement, and direct input. */
function changeGroupCount(originalId, targetCount){
  targetCount = Math.max(1, targetCount);

  // ------------------------------------------------------------------
  // 1. Resolve template (prefer live, fall back to saved JSON).
  // ------------------------------------------------------------------
  const liveSample = canvas.getObjects().find(o => o._originalId === originalId && o._mmW);

  let mmW, mmH, natW, natH;
  let srcProps = null;
  let imgEl = null;
  let tplObj = null;
  let isImageType = true;

  if(liveSample){
    natW = liveSample.width;
    natH = liveSample.height;
    // Compute the logo's native physical size from the scale — this is
    // orientation-invariant (Fabric's scaleX/scaleY are pre-rotation).
    mmW = (natW * (liveSample.scaleX || 1)) / displayPxPerMm;
    mmH = (natH * (liveSample.scaleY || 1)) / displayPxPerMm;
    srcProps = {
      _originalId: liveSample._originalId, _name: liveSample._name,
      _naturalW: liveSample._naturalW, _naturalH: liveSample._naturalH,
    };
    isImageType = liveSample.type === 'image';
    if(isImageType) imgEl = liveSample.getElement();
    tplObj = liveSample.toObject(FABRIC_EXTRA_PROPS);
  } else {
    // Scan every saved tab (we're not on the tab that holds the group).
    for(let i=0; i<state.sheetTabs.length; i++){
      if(i === state.activeTab) continue;
      const tab = state.sheetTabs[i];
      if(!tab.json || !tab.json.objects) continue;
      const o = tab.json.objects.find(x => x._mmW != null && x._originalId === originalId);
      if(o){
        natW = o.width; natH = o.height;
        mmW = (natW * (o.scaleX || 1)) / displayPxPerMm;
        mmH = (natH * (o.scaleY || 1)) / displayPxPerMm;
        srcProps = {
          _originalId: o._originalId, _name: o._name,
          _naturalW: o._naturalW, _naturalH: o._naturalH,
        };
        isImageType = o.type === 'image';
        tplObj = JSON.parse(JSON.stringify(o));
        break;
      }
    }
  }
  if(!srcProps) return; // Group doesn't exist anywhere, nothing to do.

  // Clear any active fill-template that was based on this group.
  if(state.fillTemplate && state.fillTemplate.originalId === originalId){
    state.fillTemplate = null;
  }

  // Sanity: logo must fit on the sheet in at least one orientation.
  const nativeFits  = mmW <= state.sheet.w && mmH <= state.sheet.h;
  const rotatedFits = mmH <= state.sheet.w && mmW <= state.sheet.h;
  if(!nativeFits && !rotatedFits){
    toast(t('sizeTooLarge'), 'error');
    return;
  }

  // ------------------------------------------------------------------
  // 2. Wipe ALL existing copies of this group.
  // ------------------------------------------------------------------
  const liveDoomed = canvas.getObjects().filter(o => o._originalId === originalId && o._mmW);
  liveDoomed.forEach(o => canvas.remove(o));
  for(let i=0; i<state.sheetTabs.length; i++){
    if(i === state.activeTab) continue;
    removeClonesFromSavedTab(i, originalId, Infinity);
  }

  // ------------------------------------------------------------------
  // 3. Rebuild: walk tabs in order, filling each sheet densely before
  //    moving on. The active (live) tab uses an async enlivenObjects
  //    path that mirrors tileSheet — the exact proven code path used
  //    by the "vul vel" button — so the produced layout is pixel-for-
  //    pixel identical to what the user already trusts.
  // ------------------------------------------------------------------
  let remaining = targetCount;
  let tabIdx = 0;

  const finish = ()=>{
    // --------------------------------------------------------------
    // 4. Spill to new overflow tabs if anything's left.
    // --------------------------------------------------------------
    if(remaining > 0){
      if(!isMultiSheet()){
        toast(t('sheetFullNoSpill'), 'error');
      } else {
        // Persist live-canvas changes first so the active tab's JSON is
        // current before we create new tabs.
        saveCurrentTabState();
        // Refresh tplObj from the freshly placed live state if possible.
        const refreshed = canvas.getObjects().find(o => o._originalId === originalId && o._mmW);
        if(refreshed) tplObj = refreshed.toObject(FABRIC_EXTRA_PROPS);

        let guard = 0;
        while(remaining > 0 && guard++ < 200){
          state.sheetTabs.push({
            json: { version: fabric.version, objects: [], background: null },
            fillTemplate: null,
          });
          const newIdx = state.sheetTabs.length - 1;
          const added = addClonesToSavedTab(newIdx, tplObj, mmW, mmH, natW, natH, 0, remaining);
          if(added === 0){
            state.sheetTabs.pop();
            toast(t('sizeTooLarge'), 'error');
            break;
          }
          remaining -= added;
        }
        if(guard >= 200) toast(t('sizeTooLarge'), 'error');
      }
    }

    // --------------------------------------------------------------
    // 5. Drop empty tabs (e.g. left behind after a decrement).
    // --------------------------------------------------------------
    cleanupEmptyOverflowTabs();

    // Switch to the last tab so the user sees where new copies ended up.
    const lastTab = state.sheetTabs.length - 1;
    if(lastTab !== state.activeTab && lastTab > 0){
      loadTabState(lastTab, ()=>{
        renderItemList();
        renderSelectedPanel();
        renderSheetTabs();
        updateInfoBar();
        updateSummary();
        toast(t('spillToNew')(lastTab+1), 'info');
      });
      return;
    }

    canvas.requestRenderAll();
    renderItemList();
    renderSelectedPanel();
    renderSheetTabs();
    updateInfoBar();
    updateSummary();
  };

  // Fill the live (active) canvas using buildSerializedClone + enlivenObjects
  // — identical to tileSheet's cloning mechanism.
  const placeOnLiveCanvasAsync = (count, done)=>{
    if(count <= 0 || !tplObj){ done(0); return; }
    const slots = packSpotsSmart(mmW, mmH, count);
    if(slots.length === 0){ done(0); return; }
    const serialized = slots.map(slot => {
      const obj = buildSerializedClone(tplObj, slot, mmW, mmH, natW, natH, 0, ++idCounter);
      // Re-assert identity props in case tplObj was stale.
      obj._originalId = srcProps._originalId;
      obj._name       = srcProps._name;
      obj._naturalW   = srcProps._naturalW;
      obj._naturalH   = srcProps._naturalH;
      return obj;
    });
    fabric.util.enlivenObjects(serialized, (clones)=>{
      clones.forEach(clone=>{
        attachObjListeners(clone);
        canvas.add(clone);
      });
      canvas.requestRenderAll();
      done(clones.length);
    });
  };

  // Linear async walker: process tab by tab, hand off to finish() at the end.
  const fillNextTab = ()=>{
    if(remaining <= 0 || tabIdx >= state.sheetTabs.length){
      finish();
      return;
    }
    if(tabIdx === state.activeTab){
      placeOnLiveCanvasAsync(remaining, (placed)=>{
        remaining -= placed;
        tabIdx++;
        fillNextTab();
      });
    } else {
      const placed = addClonesToSavedTab(tabIdx, tplObj, mmW, mmH, natW, natH, 0, remaining);
      remaining -= placed;
      tabIdx++;
      fillNextTab();
    }
  };

  fillNextTab();
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

/* =========================================================
   BACKGROUND REMOVAL
   ========================================================= */
// updateBgRemoveBtn is now a no-op; bg remove is wired inside renderSelectedPanel
function updateBgRemoveBtn(){}

function removeWhiteBg(obj, threshold){
  const imgEl = obj.getElement();
  const tmp = document.createElement('canvas');
  tmp.width = imgEl.naturalWidth || imgEl.width;
  tmp.height = imgEl.naturalHeight || imgEl.height;
  const tctx = tmp.getContext('2d');
  tctx.drawImage(imgEl, 0, 0);
  const data = tctx.getImageData(0,0,tmp.width,tmp.height);
  const px = data.data;
  for(let i=0; i<px.length; i+=4){
    if(px[i] >= threshold && px[i+1] >= threshold && px[i+2] >= threshold){
      px[i+3] = 0;
    }
  }
  tctx.putImageData(data, 0, 0);
  fabric.Image.fromURL(tmp.toDataURL('image/png'), newImg=>{
    newImg.set({
      left: obj.left, top: obj.top, angle: obj.angle, flipX: obj.flipX, flipY: obj.flipY,
      scaleX: obj.scaleX, scaleY: obj.scaleY,
    });
    newImg._id = obj._id;
    newImg._originalId = obj._originalId;
    newImg._name = obj._name;
    newImg._naturalW = tmp.width;
    newImg._naturalH = tmp.height;
    newImg._mmW = obj._mmW;
    newImg._mmH = obj._mmH;
    newImg._mmLeft = obj._mmLeft;
    newImg._mmTop = obj._mmTop;
    attachObjListeners(newImg);
    canvas.remove(obj);
    canvas.add(newImg);
    canvas.setActiveObject(newImg);
    canvas.requestRenderAll();
    renderItemList();
    toast(t('bgRemoved'),'success');
  });
}

/* =========================================================
   FILL SHEET
   ========================================================= */
const fillBtn = document.getElementById('fillSheetBtn');

function updateFillBtn(){
  const obj = getSelectedObj();
  fillBtn.disabled = !(obj && obj._mmW);
}

fillBtn.onclick = ()=>{
  const obj = getSelectedObj();
  if(!obj || !obj._mmW){ toast(t('addLogoFirst'),'warn'); return; }

  // Reset any rotation on the sample so the tiler works with the logo's
  // un-rotated native dimensions (the packer will rotate tiles itself).
  obj.set({ originX:'left', originY:'top', angle:0, flipX:false, flipY:false });
  // Recompute mmW/mmH from the current scale + natural width, ignoring
  // whatever getBoundingRect cached for a rotated state.
  const nativeMmW = (obj.width * (obj.scaleX || 1)) / displayPxPerMm;
  const nativeMmH = (obj.height * (obj.scaleY || 1)) / displayPxPerMm;
  obj._mmW = nativeMmW;
  obj._mmH = nativeMmH;
  obj.setCoords();

  state.fillTemplate = {
    originalId: obj._originalId,
    mmW: nativeMmW, mmH: nativeMmH,
    angle: 0,
    name: obj._name,
    naturalW: obj._naturalW, naturalH: obj._naturalH,
    sampleObj: obj,
  };
  tileSheet();
};

function clearFillTiles(){
  const tiles = canvas.getObjects().filter(o=>o._isFillTile);
  tiles.forEach(o=>canvas.remove(o));
}

/* Dense fill layout.
   Enumerates every single-cut partition (horizontal or vertical) of the sheet
   into two rectangular regions, each packed with one orientation of the logo
   (0° or 90°). Also considers single-orientation fills. Returns the densest
   layout found as an array of {x,y,w,h,rotated}. */
function bestLayout(mmW, mmH, gap, sheetW, sheetH){
  const W = sheetW, H = sheetH, g = gap;

  // Pack a rectangular region (offX, offY, regW, regH) with a single
  // orientation. rotated=true → block dims become (mmH, mmW).
  const packRegion = (offX, offY, regW, regH, rotated)=>{
    const bw = rotated ? mmH : mmW;
    const bh = rotated ? mmW : mmH;
    if (bw - 1e-6 > regW || bh - 1e-6 > regH) return [];
    const cols = Math.floor((regW + g) / (bw + g));
    const rows = Math.floor((regH + g) / (bh + g));
    if (cols <= 0 || rows <= 0) return [];
    const out = [];
    for (let r=0; r<rows; r++){
      for (let c=0; c<cols; c++){
        out.push({
          x: offX + c*(bw+g),
          y: offY + r*(bh+g),
          w: bw, h: bh, rotated
        });
      }
    }
    return out;
  };

  let best = [];
  const consider = (placements)=>{
    if (placements.length > best.length) best = placements;
  };

  // Single-orientation fills.
  consider(packRegion(0, 0, W, H, false));
  consider(packRegion(0, 0, W, H, true));

  // Horizontal split: top strip uses orientation A (N rows of it), bottom
  // strip uses orientation B (as many rows as fit).
  for (const rotA of [false, true]) {
    const bhA = rotA ? mmW : mmH;
    if (bhA - 1e-6 > H) continue;
    for (let n = 1; ; n++) {
      const topH = n*bhA + (n-1)*g;
      if (topH - 1e-6 > H) break;
      const topPlacements = packRegion(0, 0, W, topH, rotA);
      if (topPlacements.length === 0) break;
      const remH = H - topH - g;
      for (const rotB of [false, true]) {
        const bottomPlacements = remH > 0 ? packRegion(0, topH + g, W, remH, rotB) : [];
        consider(topPlacements.concat(bottomPlacements));
      }
    }
  }

  // Vertical split: left strip uses orientation A (N cols of it), right strip
  // uses orientation B.
  for (const rotA of [false, true]) {
    const bwA = rotA ? mmH : mmW;
    if (bwA - 1e-6 > W) continue;
    for (let n = 1; ; n++) {
      const leftW = n*bwA + (n-1)*g;
      if (leftW - 1e-6 > W) break;
      const leftPlacements = packRegion(0, 0, leftW, H, rotA);
      if (leftPlacements.length === 0) break;
      const remW = W - leftW - g;
      for (const rotB of [false, true]) {
        const rightPlacements = remW > 0 ? packRegion(leftW + g, 0, remW, H, rotB) : [];
        consider(leftPlacements.concat(rightPlacements));
      }
    }
  }

  return best;
}

function tileSheet(){
  if(!state.fillTemplate){ toast(t('noFillActive'),'warn'); return; }
  const ft = state.fillTemplate;
  const sample = canvas.getObjects().find(o=>o._originalId === ft.originalId && !o._isFillTile);
  if(!sample){ toast(t('logoGone'),'error'); state.fillTemplate = null; return; }
  ft.sampleObj = sample;

  // clear non-sample copies of this logo + any existing tiles
  const toRemove = canvas.getObjects().filter(o=>
    (o._originalId === ft.originalId && o !== sample) || o._isFillTile
  );
  toRemove.forEach(o=>canvas.remove(o));

  // Force sample to a known orientation (top-left origin, no rotation, no flip)
  sample.set({ originX:'left', originY:'top', angle:0, flipX:false, flipY:false });

  const layout = bestLayout(ft.mmW, ft.mmH, state.gapMm, state.sheet.w, state.sheet.h);
  if(!layout || layout.length === 0){
    toast(t('sizeTooLarge'),'error');
    state.fillTemplate = null;
    return;
  }

  const natW = sample.width;
  const natH = sample.height;

  const placeAt = (target, p)=>{
    let sx, sy;
    if(p.rotated){
      sy = (p.w * displayPxPerMm) / natH;
      sx = (p.h * displayPxPerMm) / natW;
    } else {
      sx = (p.w * displayPxPerMm) / natW;
      sy = (p.h * displayPxPerMm) / natH;
    }
    target.set({
      originX:'center', originY:'center',
      angle: p.rotated ? 90 : 0,
      scaleX: sx, scaleY: sy,
      left: (p.x + p.w/2) * displayPxPerMm,
      top:  (p.y + p.h/2) * displayPxPerMm,
    });
    target._mmLeft = p.x;
    target._mmTop  = p.y;
    target._mmW = p.w;
    target._mmH = p.h;
    target.setCoords();
  };

  placeAt(sample, layout[0]);

  const sampleJson = sample.toJSON(FABRIC_EXTRA_PROPS);
  let idx = 1;
  const next = ()=>{
    if(idx >= layout.length){
      canvas.requestRenderAll();
      renderItemList();
      updateInfoBar();
      updateSummary();
      pushUndo();
      const rotCount = layout.filter(p=>p.rotated).length;
      const extra = rotCount === 0 ? '' : ` · ${rotCount} × 90°`;
      toast(`${layout.length} ${t('copies')}${extra}`, 'success');
      return;
    }
    fabric.util.enlivenObjects([sampleJson], ([clone])=>{
      clone._id = ++idCounter;
      clone._originalId = ft.originalId;
      clone._name = ft.name;
      clone._naturalW = ft.naturalW;
      clone._naturalH = ft.naturalH;
      clone._isFillTile = true;
      placeAt(clone, layout[idx]);
      attachObjListeners(clone);
      canvas.add(clone);
      idx++;
      next();
    });
  };
  next();
}

/* =========================================================
   SUMMARY (across all sheet tabs)
   ========================================================= */
function collectAllSheetStats(){
  if(!undoRedoStack._statsDirty && undoRedoStack._statsCache){
    return undoRedoStack._statsCache;
  }

  // Temporarily save current tab then reconstruct stats from JSON of other tabs + live canvas
  const stats = { unique:new Set(), total:0, used:0, sheetArea:0, lowDpi:0, midDpi:0, okDpi:0 };
  const tabs = state.sheetTabs;
  const activeIdx = state.activeTab;

  for(let i=0; i<tabs.length; i++){
    stats.sheetArea += state.sheet.w * state.sheet.h;
    let objs;
    if(i === activeIdx){
      objs = canvas.getObjects().map(o=>({
        _originalId: o._originalId, _mmW: o._mmW, _mmH: o._mmH,
        _naturalW: o._naturalW, _svgSource: o._svgSource, type: o.type,
      }));
    } else if(tabs[i].json && tabs[i].json.objects){
      objs = tabs[i].json.objects.map(o=>({
        _originalId: o._originalId, _mmW: o._mmW, _mmH: o._mmH,
        _naturalW: o._naturalW, _svgSource: o._svgSource, type: o.type,
      }));
    } else {
      objs = [];
    }
    objs.forEach(o=>{
      if(!o._mmW) return;
      stats.unique.add(o._originalId);
      stats.total++;
      stats.used += o._mmW * o._mmH;
      const isVector = o.type === 'group' && o._svgSource;
      const dpi = isVector ? Infinity : (o._naturalW / o._mmW) * MM_PER_INCH;
      if(!isFinite(dpi)) { stats.okDpi++; return; }
      if(dpi >= 300) stats.okDpi++;
      else if(dpi >= 150) stats.midDpi++;
      else stats.lowDpi++;
    });
  }

  undoRedoStack._statsCache = stats;
  undoRedoStack._statsDirty = false;
  return stats;
}

function updateSummary(){
  const s = collectAllSheetStats();
  document.getElementById('sumUnique').textContent = s.unique.size;
  document.getElementById('sumTotal').textContent  = s.total;
  const pct = s.sheetArea ? Math.round((s.used / s.sheetArea) * 100) : 0;
  document.getElementById('sumUsage').textContent  = pct + '%';
  let dpiTxt;
  if(s.total === 0) dpiTxt = '—';
  else if(s.lowDpi > 0) dpiTxt = `⚠️ ${s.lowDpi} laag`;
  else if(s.midDpi > 0) dpiTxt = `⚠ ${s.midDpi} matig`;
  else dpiTxt = `✓ 300+`;
  document.getElementById('sumDpi').textContent = dpiTxt;
  document.getElementById('sumSheets').textContent = state.sheetTabs.length;
}

/* =========================================================
   PDF EXPORT (multi-page for multi-sheet 55x100)
   ========================================================= */
const exportBtn = document.getElementById('exportBtn');

exportBtn.onclick = async ()=>{
  // pre-check low dpi across all tabs
  const stats = collectAllSheetStats();
  if(stats.lowDpi > 0){
    const ok = await confirmModal(t('lowResFound'), `${stats.lowDpi} ${t('lowResBody')}`, {okLabel:t('lowResOk')});
    if(!ok) return;
  }
  if(stats.total === 0){
    toast(t('addLogoFirst'),'warn');
    return;
  }
  // Show PDF progress indicator above export button
  showPdfProgress(true);

  // Yield so the browser paints the spinner before heavy work
  await new Promise(r => requestAnimationFrame(()=> setTimeout(r, 50)));

  // save current tab first
  saveCurrentTabState();
  const prevActive = state.activeTab;
  const savedDisplayPxPerMm = displayPxPerMm;

  // NOTE: PDF uses sRGB color space — this is correct for DTF printing.
  const pdf = new jsPDF({
    orientation: state.sheet.w > state.sheet.h ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [state.sheet.w, state.sheet.h],
  });

  // Target 300 DPI: exact pixel dimensions for the PDF page
  const DPI = 300;
  const exportPxW = Math.round(state.sheet.w / MM_PER_INCH * DPI);
  const exportPxH = Math.round(state.sheet.h / MM_PER_INCH * DPI);
  const exportPxPerMm = exportPxW / state.sheet.w;

  // Two-stage approach for speed:
  //   1. Render each object individually onto small Fabric tile canvases
  //   2. Composite tiles onto a single page-sized 2D canvas
  //   3. Pass the raw canvas element to jsPDF (avoids base64 overhead)
  //
  // This is ~3-5× faster than loading the full JSON into a 6500×11800
  // Fabric StaticCanvas because:
  //   - Each tile render is small → fast GPU draw
  //   - `drawImage` compositing is native C++ in the browser
  //   - No JSON parse/serialise round-trip for the full page
  const offDiv = document.createElement('div');
  offDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden';
  document.body.appendChild(offDiv);
  const pageCanvasEl = document.createElement('canvas');
  pageCanvasEl.width  = exportPxW;
  pageCanvasEl.height = exportPxH;
  offDiv.appendChild(pageCanvasEl);
  const pageCtx = pageCanvasEl.getContext('2d');

  // Reusable tile element (resized per object)
  const tileEl = document.createElement('canvas');
  offDiv.appendChild(tileEl);

  const yieldFrame = ()=> new Promise(r => setTimeout(r, 0));

  const renderTab = async (tabIdx) => {
    const tab = state.sheetTabs[tabIdx];
    const objs = tab.json && tab.json.objects ? tab.json.objects : [];

    // Clear page canvas (transparent background — DTF film)
    pageCtx.clearRect(0, 0, exportPxW, exportPxH);

    for(let idx = 0; idx < objs.length; idx++){
      const oData = objs[idx];
      if(oData._mmW == null) continue;

      const isRotated = Math.abs(((oData.angle||0) % 180)) > 0.1;
      // Bounding box in export pixels (+ small padding for anti-alias)
      const bboxW = Math.ceil(oData._mmW * exportPxPerMm) + 4;
      const bboxH = Math.ceil(oData._mmH * exportPxPerMm) + 4;
      const destX = Math.round(oData._mmLeft * exportPxPerMm);
      const destY = Math.round(oData._mmTop  * exportPxPerMm);

      tileEl.width  = bboxW;
      tileEl.height = bboxH;

      const tileCanvas = new fabric.StaticCanvas(tileEl, {
        width: bboxW, height: bboxH,
        backgroundColor: null,
        enableRetinaScaling: false,
      });

      // Enliven single object from its serialised data
      await new Promise(resolve => {
        fabric.util.enlivenObjects([oData], (enlivened) => {
          if(!enlivened.length){ resolve(); return; }
          const o = enlivened[0];
          // Scale to 300 DPI
          if(isRotated){
            o.scaleY = (oData._mmW * exportPxPerMm) / o.height;
            o.scaleX = (oData._mmH * exportPxPerMm) / o.width;
          } else {
            o.scaleX = (oData._mmW * exportPxPerMm) / o.width;
            o.scaleY = (oData._mmH * exportPxPerMm) / o.height;
          }
          // Position at tile centre
          if(o.originX === 'center' && o.originY === 'center'){
            o.left = bboxW / 2;
            o.top  = bboxH / 2;
          } else {
            o.left = 2;
            o.top  = 2;
          }
          o.setCoords();
          tileCanvas.add(o);
          tileCanvas.renderAll();
          resolve();
        });
      });

      // Composite tile onto page canvas using fast native drawImage
      pageCtx.drawImage(tileEl, destX, destY);
      tileCanvas.dispose();

      // Yield every 3 objects so the spinner stays animated
      if(idx % 3 === 2) await yieldFrame();
    }

    // Add page to PDF — pass raw HTMLCanvasElement directly
    if(tabIdx > 0) pdf.addPage([state.sheet.w, state.sheet.h], state.sheet.w > state.sheet.h ? 'landscape' : 'portrait');
    pdf.addImage(pageCanvasEl, 'PNG', 0, 0, state.sheet.w, state.sheet.h, undefined, 'FAST');
  };

  try {
    for(let i = 0; i < state.sheetTabs.length; i++){
      // For the currently active tab, save it first so json is fresh
      if(i === prevActive){
        state.sheetTabs[i].json = canvas.toJSON(FABRIC_EXTRA_PROPS);
      }
      await renderTab(i);
      await yieldFrame();
    }
    // Add footer to every page: "projectTitle · Transferpersshop · dd-mm-yyyy"
    const projectTitle = (document.getElementById('projectTitleInput').value || '').trim();
    const today = new Date();
    const dateStr = String(today.getDate()).padStart(2,'0') + '-' + String(today.getMonth()+1).padStart(2,'0') + '-' + today.getFullYear();
    const footerParts = [projectTitle, 'Transferpersshop', dateStr].filter(Boolean);
    const footerText = footerParts.join(' · ');
    const pageCount = pdf.internal.getNumberOfPages();
    for(let p = 1; p <= pageCount; p++){
      pdf.setPage(p);
      pdf.setFontSize(7);
      pdf.setTextColor(160, 160, 160);
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      pdf.text(footerText, pw / 2, ph - 3, { align: 'center' });
    }

    // Use project title in filename if available
    const safeTitle = projectTitle ? projectTitle.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s+/g, '-').substring(0, 40) : '';
    const filename = safeTitle
      ? `${safeTitle}-${state.sheet.id}-${dateStr}.pdf`
      : `gangsheet-${state.sheet.id}-${state.sheetTabs.length}vel.pdf`;
    pdf.save(filename);
    showPdfProgress(false, `${filename} ${t('pdfSaved')}`);
  } catch(err){
    console.error('PDF export error:', err);
    showPdfProgress(false, 'Export mislukt');
    toast('PDF export mislukt','warn');
  } finally {
    document.body.removeChild(offDiv);
  }
};

/* =========================================================
   PDF PROGRESS INDICATOR (above export button)
   ========================================================= */
function showPdfProgress(show, doneMsg){
  const wrap = document.getElementById('pdfProgressWrap');
  if(show){
    wrap.innerHTML = `<div class="pdf-progress-inner">
      <div class="pdf-spinner"></div>
      <span>${t('pdfGenerating')}</span>
    </div>`;
    wrap.classList.add('visible');
    document.getElementById('exportBtn').disabled = true;
  } else {
    wrap.innerHTML = `<div class="pdf-progress-inner pdf-done">
      <span class="pdf-check">✓</span>
      <span>${doneMsg || ''}</span>
    </div>`;
    document.getElementById('exportBtn').disabled = false;
    setTimeout(()=>{ wrap.classList.remove('visible'); wrap.innerHTML = ''; }, 3500);
  }
}

/* =========================================================
   TOAST + MODAL
   ========================================================= */
const toastWrap = document.getElementById('toastWrap');
function toast(msg, type='info', ms=3000, onClose){
  const el = document.createElement('div');
  el.className = 'toast ' + type + (ms === 0 ? ' sticky' : '');
  const text = document.createElement('span');
  text.className = 'toast-text';
  text.textContent = msg;
  el.appendChild(text);
  if(ms === 0){
    const close = document.createElement('button');
    close.className = 'toast-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Sluiten');
    close.innerHTML = '&times;';
    close.onclick = ()=>{
      el.style.opacity = '0';
      el.style.transform = 'translateY(-6px)';
      setTimeout(()=>{ el.remove(); if(onClose) onClose(); }, 300);
    };
    el.appendChild(close);
  } else {
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateY(-6px)'; }, ms);
    setTimeout(()=>{ el.remove(); if(onClose) onClose(); }, ms+400);
  }
  toastWrap.appendChild(el);
}

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalActions = document.getElementById('modalActions');

function openModal(title, body, buttons){
  return new Promise(resolve=>{
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalActions.innerHTML = '';
    buttons.forEach(b=>{
      const btn = document.createElement('button');
      btn.className = 'btn ' + (b.primary ? 'btn-primary' : 'btn-ghost');
      btn.textContent = b.label;
      btn.onclick = ()=>{ modal.classList.remove('open'); resolve(b.val); };
      modalActions.appendChild(btn);
    });
    modal.classList.add('open');
  });
}

function confirmModal(title, body, opts={}){
  return openModal(title, body, [
    { label: opts.cancelLabel || t('cancel'), val:false },
    { label: opts.okLabel     || t('ok'),     val:true, primary:true },
  ]);
}

/* =========================================================
   REPACK — shelf-packs every logo on the current canvas using the new gap.
   Objects that don't fit spill to a new tab (multi-sheet mode) or trigger a
   warning (single-sheet mode).
   ========================================================= */
function repackAll(){
  if(state.fillTemplate){ tileSheet(); return; }
  const objs = canvas.getObjects().filter(o=>o._mmW && o._mmH && !o._isFillTile);
  if(objs.length === 0) return;

  // Sort by bounding-box height desc, then width desc — shelf-packing heuristic.
  const sorted = [...objs].sort((a,b)=>{
    if(b._mmH !== a._mmH) return b._mmH - a._mmH;
    return b._mmW - a._mmW;
  });

  const gap = state.gapMm || 0;
  const sheetW = state.sheet.w, sheetH = state.sheet.h;
  let x = 0, y = 0, rowH = 0;
  const overflow = [];

  sorted.forEach(o=>{
    if(o._mmW > sheetW || o._mmH > sheetH){
      overflow.push(o);
      return;
    }
    if(x + o._mmW > sheetW){
      x = 0;
      y += rowH + gap;
      rowH = 0;
    }
    if(y + o._mmH > sheetH){
      overflow.push(o);
      return;
    }
    // Reposition only — don't touch scaleX/scaleY/angle to avoid deforming
    // rotated or non-uniformly-scaled objects. Use bounding-rect center offset
    // to correctly position objects regardless of origin or rotation.
    o._mmLeft = x;
    o._mmTop  = y;
    const br = o.getBoundingRect(true, true);
    const dxPx = o.left - br.left; // offset from bounding-rect left to object origin
    const dyPx = o.top  - br.top;
    o.set({
      left: x * displayPxPerMm + dxPx,
      top:  y * displayPxPerMm + dyPx,
    });
    o.setCoords();
    x += o._mmW + gap;
    if(o._mmH > rowH) rowH = o._mmH;
  });

  canvas.requestRenderAll();
  renderItemList();
  updateInfoBar();
  updateSummary();
  pushUndo();

  if(overflow.length > 0){
    if(!isMultiSheet()){
      toast(`${overflow.length} × ${t('sheetFullNoSpill')}`, 'warn');
      return;
    }
    // Serialize overflow, remove from current canvas, spill to new tab
    const overflowJson = {
      version: fabric.version,
      objects: overflow.map(o => o.toJSON(FABRIC_EXTRA_PROPS)),
    };
    overflow.forEach(o => canvas.remove(o));
    saveCurrentTabState();
    state.sheetTabs.push({ json: overflowJson, fillTemplate: null });
    const newIdx = state.sheetTabs.length - 1;
    loadTabState(newIdx, ()=>{
      toast(t('spillToNew')(newIdx+1), 'info');
      repackAll();
    });
  }
}

/* =========================================================
   GAP STEPPER (left sidebar section 3)
   ========================================================= */
let gapTimer = null;

function syncGapUI(){
  const inp = document.getElementById('gapInput');
  const unitLbl = document.getElementById('gapUnitLabel');
  if(!inp) return;
  const isCm = state.unit === 'cm';
  inp.step = isCm ? '0.1' : '0.5';
  inp.value = isCm ? (state.gapMm / 10).toFixed(1) : state.gapMm;
  if(unitLbl) unitLbl.textContent = isCm ? 'cm' : 'mm';
}

function applyGapChange(newMm){
  state.gapMm = Math.max(0, Math.min(20, newMm));
  syncGapUI();
  undoRedoStack._statsDirty = true;
  clearTimeout(gapTimer);
  gapTimer = setTimeout(()=>{
    if(state.fillTemplate) tileSheet();
    else repackAll();
  }, 300);
}

document.getElementById('gapDec').onclick = ()=>{
  const step = state.unit === 'cm' ? 1 : 0.5;
  applyGapChange(state.gapMm - step);
};
document.getElementById('gapInc').onclick = ()=>{
  const step = state.unit === 'cm' ? 1 : 0.5;
  applyGapChange(state.gapMm + step);
};
document.getElementById('gapInput').onchange = e=>{
  let v = parseFloat(e.target.value) || 0;
  if(state.unit === 'cm') v *= 10;
  applyGapChange(v);
};

/* =========================================================
   SHEET BACKGROUND PICKER
   ========================================================= */
document.getElementById('bgPicker').addEventListener('click', e=>{
  if(!e.target.dataset.bg) return;
  const bg = e.target.dataset.bg;
  state.sheetBg = bg;
  [...e.currentTarget.children].forEach(el=>el.classList.toggle('active', el.dataset.bg===bg));
  const shadow = document.getElementById('sheetShadow');
  shadow.classList.remove('bg-white','bg-gray','bg-checker');
  shadow.classList.add('bg-'+bg);
});

/* =========================================================
   ZOOM
   ========================================================= */
function setZoom(z){
  state.zoom = Math.max(0.25, Math.min(4, z));
  resizeSheet();
}
document.getElementById('zoomInBtn').onclick  = ()=>setZoom(state.zoom * 1.25);
document.getElementById('zoomOutBtn').onclick = ()=>setZoom(state.zoom / 1.25);
document.getElementById('zoomFitBtn').onclick = ()=>setZoom(1);
document.getElementById('zoomOneBtn').onclick = ()=>setZoom(2);

/* =========================================================
   UNDO/REDO BUTTONS
   ========================================================= */
document.getElementById('undoBtn').onclick = ()=>undo();
document.getElementById('redoBtn').onclick = ()=>redo();

/* =========================================================
   PROJECT SAVE/LOAD
   ========================================================= */
/* =========================================================
   OPTIMIZE LAYOUT
   ========================================================= */
document.getElementById('optimizeBtn').onclick = ()=>{
  const objs = canvas.getObjects().filter(o=>o._mmW);
  if(objs.length < 2) return;
  pushUndo();

  // Sort by height desc, then width desc — shelf-packing gives best results
  // when tallest items go first (fewer wasted shelf-gaps).
  const sorted = [...objs].sort((a,b)=>{
    if(b._mmH !== a._mmH) return b._mmH - a._mmH;
    return b._mmW - a._mmW;
  });

  const gap = state.gapMm || 0;
  const sheetW = state.sheet.w, sheetH = state.sheet.h;
  let x = 0, y = 0, rowH = 0;

  sorted.forEach(o=>{
    const w = o._mmW, h = o._mmH;
    if(w > sheetW || h > sheetH) return; // skip oversized

    // Next row if current doesn't fit
    if(x + w > sheetW){
      x = 0;
      y += rowH + gap;
      rowH = 0;
    }
    // Skip if no vertical space left
    if(y + h > sheetH) return;

    o._mmLeft = x;
    o._mmTop  = y;
    const br = o.getBoundingRect(true, true);
    const dxPx = o.left - br.left;
    const dyPx = o.top  - br.top;
    o.set({
      left: x * displayPxPerMm + dxPx,
      top:  y * displayPxPerMm + dyPx,
    });
    o.setCoords();
    x += w + gap;
    if(h > rowH) rowH = h;
  });

  canvas.requestRenderAll();
  renderItemList();
  updateInfoBar();
  toast(t('optimizeDone'), 'success');
};

/* =========================================================
   PRINT PREVIEW
   ========================================================= */
document.getElementById('previewBtn').onclick = async ()=>{
  saveCurrentTabState();
  const prevTab = state.activeTab;
  const totalSheets = state.sheetTabs.length;

  // Build preview overlay (wider than standard modal)
  let overlay = document.getElementById('previewOverlay');
  if(!overlay){
    overlay = document.createElement('div');
    overlay.id = 'previewOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:900;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target === overlay){ overlay.style.opacity='0'; setTimeout(()=>{ overlay.style.display='none'; },250); } });
  }
  overlay.style.display = 'flex';
  requestAnimationFrame(()=>{ overlay.style.opacity = '1'; });

  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:14px;padding:24px;max-width:720px;width:92%;max-height:85vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.3)';

  // Header with count + scroll hint
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-shrink:0';
  const title = document.createElement('h3');
  title.style.cssText = 'font-size:1.15rem;margin:0';
  title.textContent = `${t('previewTitle')} — ${totalSheets} ${totalSheets === 1 ? t('sheetLabel').toLowerCase() : 'vellen'}`;
  header.appendChild(title);
  if(totalSheets > 2){
    const hint = document.createElement('span');
    hint.style.cssText = 'font-size:.75rem;color:var(--muted)';
    hint.textContent = '↕ scroll voor meer';
    header.appendChild(hint);
  }
  const closeX = document.createElement('button');
  closeX.style.cssText = 'width:32px;height:32px;border-radius:50%;border:none;background:#f3f4f6;cursor:pointer;font-size:1.1rem;color:var(--muted);display:flex;align-items:center;justify-content:center;margin-left:12px;flex-shrink:0';
  closeX.textContent = '✕';
  closeX.onclick = ()=>{ overlay.style.opacity='0'; setTimeout(()=>{ overlay.style.display='none'; },250); };
  header.appendChild(closeX);
  box.appendChild(header);

  // Scrollable grid for thumbnails
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;overflow-y:auto;flex:1;padding-right:4px';
  box.appendChild(grid);

  // Placeholder cards while rendering
  for(let i=0; i<totalSheets; i++){
    const card = document.createElement('div');
    card.id = 'previewCard'+i;
    card.style.cssText = 'border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center';
    const imgWrap = document.createElement('div');
    imgWrap.style.cssText = `width:100%;aspect-ratio:${state.sheet.w}/${state.sheet.h};background:#f3f4f6;border-radius:6px;margin-bottom:8px;display:flex;align-items:center;justify-content:center;overflow:hidden`;
    const spinner = document.createElement('div');
    spinner.style.cssText = 'width:24px;height:24px;border:3px solid #e5e7eb;border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite';
    imgWrap.appendChild(spinner);
    card.appendChild(imgWrap);
    const label = document.createElement('div');
    label.style.cssText = 'font-size:.8rem;color:var(--muted)';
    label.innerHTML = `<strong style="color:var(--text)">${t('sheetLabel')} ${i+1}</strong>`;
    card.appendChild(label);
    grid.appendChild(card);
  }

  overlay.innerHTML = '';
  overlay.appendChild(box);

  // Render actual thumbnails by switching tabs
  const yieldFrame = ()=> new Promise(r => setTimeout(r, 30));

  for(let i=0; i<totalSheets; i++){
    await new Promise(resolve=>{
      loadTabState(i, ()=>{
        requestAnimationFrame(()=>{
          const mult = Math.min(1, 400 / Math.max(canvas.getWidth(), canvas.getHeight(), 1));
          const dataUrl = canvas.toDataURL({ format:'png', multiplier: mult, enableRetinaScaling:false });
          const count = canvas.getObjects().filter(o=>o._mmW).length;
          const card = document.getElementById('previewCard'+i);
          if(card){
            const imgWrap = card.children[0];
            imgWrap.innerHTML = '';
            const img = document.createElement('img');
            img.src = dataUrl;
            img.style.cssText = 'width:100%;height:100%;object-fit:contain;border-radius:4px';
            img.alt = `${t('sheetLabel')} ${i+1}`;
            imgWrap.appendChild(img);
            card.children[1].innerHTML = `<strong style="color:var(--text)">${t('sheetLabel')} ${i+1}</strong> · ${count} logo's`;
          }
          resolve();
        });
      });
    });
    await yieldFrame();
  }

  // Restore original tab
  loadTabState(prevTab);
};

/* Keyboard shortcuts: now shown in the info panel (ⓘ button) */

/* =========================================================
   KEYBOARD
   ========================================================= */
document.addEventListener('keydown', e=>{
  const tag = (e.target.tagName||'').toLowerCase();
  if(tag === 'input' || tag === 'textarea') return;

  if(e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey){ e.preventDefault(); undo(); return; }
  if((e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey) || (e.key === 'y' && (e.ctrlKey || e.metaKey))){ e.preventDefault(); redo(); return; }
  if(e.key === 'a' && (e.ctrlKey || e.metaKey)){ e.preventDefault(); canvas.discardActiveObject(); canvas.getObjects().forEach(o=>canvas.setActiveObject(o, null, true)); canvas.requestRenderAll(); renderSelectedPanel(); return; }

  if(e.key === '+' || e.key === '='){ e.preventDefault(); setZoom(state.zoom * 1.25); return; }
  if(e.key === '-' || e.key === '_'){ e.preventDefault(); setZoom(state.zoom / 1.25); return; }
  if(e.key === '0'){ e.preventDefault(); setZoom(1); return; }

  const obj = getSelectedObj();
  if(!obj) return;

  if(e.key === 'Delete' || e.key === 'Backspace'){
    e.preventDefault();
    if(obj.type === 'activeSelection'){
      const objs = obj._objects || [];
      objs.forEach(o => canvas.remove(o));
      canvas.requestRenderAll();
      canvas.discardActiveObject();
      renderItemList();
      renderSelectedPanel();
      updateInfoBar();
      pushUndo();
    } else {
      removeObj(obj);
    }
    return;
  }
  if(e.key === 'd' && (e.ctrlKey || e.metaKey)){ e.preventDefault(); duplicate(obj); return; }
  const nudge = e.shiftKey ? 5 : 1;
  let dx=0, dy=0;
  if(e.key === 'ArrowLeft')  dx = -nudge;
  if(e.key === 'ArrowRight') dx =  nudge;
  if(e.key === 'ArrowUp')    dy = -nudge;
  if(e.key === 'ArrowDown')  dy =  nudge;
  if(dx || dy){
    e.preventDefault();
    obj._mmLeft = Math.max(0, Math.min(state.sheet.w - obj._mmW, (obj._mmLeft||0) + dx));
    obj._mmTop  = Math.max(0, Math.min(state.sheet.h - obj._mmH, (obj._mmTop||0)  + dy));
    obj.set({ left: obj._mmLeft * displayPxPerMm, top: obj._mmTop * displayPxPerMm });
    obj.setCoords();
    canvas.requestRenderAll();
    renderSelectedPanel();
    updateInfoBar();
    pushUndo();
  }
});

/* =========================================================
   LANGUAGE SWITCH
   ========================================================= */
function applyI18n(){
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    const val = I18N[state.lang][key];
    if(typeof val === 'string') el.textContent = val;
  });
  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    const val = I18N[state.lang][key];
    if(typeof val === 'string') el.placeholder = val;
  });
  /* Upload tip with clickable link */
  const tipP = document.getElementById('uploadTipP');
  if(tipP){
    const tipText = I18N[state.lang].uploadTip || '';
    const linkText = I18N[state.lang].uploadTipLink || '';
    tipP.innerHTML = '';
    tipP.appendChild(document.createTextNode(tipText + ' '));
    const a = document.createElement('a');
    a.href = '#';
    a.className = 'tip-link';
    a.textContent = linkText;
    a.onclick = (e)=>{ e.preventDefault(); document.getElementById('infoPanelBackdrop').classList.add('open'); };
    tipP.appendChild(a);
  }
  renderSizeGrid();
  renderSelectedPanel();
  renderItemList();
  renderSheetTabs();
  updateInfoBar();
  updateSummary();
}

document.getElementById('langSwitch').addEventListener('click', e=>{
  if(e.target.tagName !== 'BUTTON') return;
  const lang = e.target.dataset.lang;
  if(!lang || !I18N[lang]) return;
  state.lang = lang;
  [...e.currentTarget.children].forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  applyI18n();
});

/* =========================================================
   INIT
   ========================================================= */
window.addEventListener('resize', ()=>{ resizeSheet(); });

renderSizeGrid();
resizeSheet();
updateInfoBar();
updateSummary();
renderSheetTabs();
renderSelectedPanel();
renderItemList();
syncGapUI();
applyI18n();
updateUndoRedoButtons();

/* =========================================================
   INFO PANEL
   ========================================================= */
document.getElementById('infoBtn').onclick = ()=>{
  document.getElementById('infoPanelBackdrop').classList.add('open');
};
document.getElementById('infoClose').onclick = ()=>{
  document.getElementById('infoPanelBackdrop').classList.remove('open');
};
document.getElementById('infoPanelBackdrop').onclick = (e)=>{
  if(e.target === e.currentTarget) e.currentTarget.classList.remove('open');
};

/* =========================================================
   GUIDED TOUR
   ========================================================= */
const TOUR_STEPS = [
  { target:'#projectTitleSection',        titleKey:'tourStepProjectTitle', bodyKey:'tourStepProjectBody', pos:'right' },
  { target:'.left .section:nth-child(2)', titleKey:'tourStep1Title', bodyKey:'tourStep1Body', pos:'right' },
  { target:'.left .section:nth-child(3)', titleKey:'tourStep2Title', bodyKey:'tourStep2Body', pos:'right' },
  { target:'#gapSection',                 titleKey:'tourStepGapTitle', bodyKey:'tourStepGapBody', pos:'right' },
  { target:'#itemListSection',            titleKey:'tourStepListTitle', bodyKey:'tourStepListBody', pos:'right' },
  { target:'.zoom-bar',                   titleKey:'tourStepZoomTitle', bodyKey:'tourStepZoomBody', pos:'below' },
  { target:'.canvas-bottom-bar',          titleKey:'tourStep6Title', bodyKey:'tourStep6Body', pos:'above' },
  { target:'#selectedSection',            titleKey:'tourStepSelTitle', bodyKey:'tourStepSelBody', pos:'left' },
  { target:'.right .section:nth-child(2)',titleKey:'tourStep5Title', bodyKey:'tourStep5Body', pos:'left' },
];

let tourIdx = -1;
const tourBackdrop  = document.getElementById('tourBackdrop');
const tourHighlight = document.getElementById('tourHighlight');
const tourTooltip   = document.getElementById('tourTooltip');
const tourTitle     = document.getElementById('tourStepTitle');
const tourBody      = document.getElementById('tourStepBody');
const tourStepNum   = document.getElementById('tourStepNum');
const tourNextBtn   = document.getElementById('tourNext');
const tourSkipBtn   = document.getElementById('tourSkip');

function showTourStep(idx){
  tourIdx = idx;
  if(idx >= TOUR_STEPS.length){ endTour(); return; }
  const step = TOUR_STEPS[idx];
  const el = document.querySelector(step.target);
  if(!el){ showTourStep(idx+1); return; }

  const rect = el.getBoundingClientRect();
  const pad = 8;
  tourHighlight.style.left   = (rect.left - pad) + 'px';
  tourHighlight.style.top    = (rect.top - pad) + 'px';
  tourHighlight.style.width  = (rect.width + pad*2) + 'px';
  tourHighlight.style.height = (rect.height + pad*2) + 'px';

  tourTitle.textContent = t(step.titleKey);
  tourBody.textContent  = t(step.bodyKey);
  tourStepNum.textContent = `${idx+1} / ${TOUR_STEPS.length}`;
  tourNextBtn.textContent = idx === TOUR_STEPS.length - 1 ? t('tourFinish') : t('tourNext');

  // Position tooltip — reset all sides first
  const margin = 16;
  tourTooltip.style.left = 'auto';
  tourTooltip.style.right = 'auto';
  tourTooltip.style.top = 'auto';
  tourTooltip.style.bottom = 'auto';
  if(step.pos === 'right'){
    tourTooltip.style.left = (rect.right + margin) + 'px';
    tourTooltip.style.top  = rect.top + 'px';
  } else if(step.pos === 'left'){
    tourTooltip.style.right = (window.innerWidth - rect.left + margin) + 'px';
    tourTooltip.style.top  = rect.top + 'px';
  } else if(step.pos === 'above'){
    tourTooltip.style.left = rect.left + 'px';
    tourTooltip.style.bottom = (window.innerHeight - rect.top + margin) + 'px';
  } else { // below
    tourTooltip.style.left = rect.left + 'px';
    tourTooltip.style.top  = (rect.bottom + margin) + 'px';
  }
}

function startTour(){
  tourBackdrop.classList.add('open');
  showTourStep(0);
}
function endTour(){
  tourBackdrop.classList.remove('open');
  tourIdx = -1;
}

document.getElementById('tourBtn').onclick = startTour;
tourNextBtn.onclick = ()=> showTourStep(tourIdx + 1);
tourSkipBtn.onclick = endTour;
tourBackdrop.onclick = (e)=>{
  if(e.target === tourBackdrop) endTour();
};
