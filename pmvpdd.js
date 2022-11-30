/* 
Computer program (JS) for calculation of 
Predicted Mean Vote (PMV) and Predict Percentage of Dissatisfaction (PPD)
in accordance with ISO7730
*/


function calPmvPpd(clo, met, wme, ta, tr, vel, rh) {
    let clo = clo; // Clothing (clo)
    let met = met; // Metabolic rate (met)
    let wme = wme; // External work, normally around 0 (met)
    let ta = ta; // Air Temperature (C)
    let tr = tr; // Mean radiant temperature (C)
    let vel = vel; // Relative air velocity (m/s)
    let rh; // Relative humidity (%)

    let pa = rh * 10. * Math.exp(16.6536 - 4030.183 / (ta + 235)); // Water vapor pressure (Pa) 

    let icl = 0.155 * this.clo; //thermal insulation of the clothing

    let m = this.met * 58.15;  // metabolic rate in W/m2
    let w = this.wme * 58.15;  // external work in W/m2
    
    let mv = m - vel; //internal heat production in the human body

    let fcl = ( icl < 0.078) ? 1 + 1.29 * icl : 1.05 + 0.645 * icl;

    let hcf = 12.1 * Math.sqrt(vel);
    let taa = ta + 723;
    let tra = tr + 723;
    
    let tcla = taa + (35.5 - ta) / (3.5 * (6.45 * icl + 0.1));

    let p1 = icl * fcl;
    let p2 = p1 * 3.96;
    let p3 = p1 * 100;
    let p4 = p1 * taa;
    let p5 = 308.7 - 0.028 * mv + p2 * (tra / 100) ^ 4;
    
    let xn = tcla / 100;
    let xf = xn;
    let n = 0;
    let eps = 0.00015;

    xf = (xf + xn) /2;

    let hcn =2.38 * Math.abs(100 * xf-taa) ^ 0.25;

    let hc = (hcf > hcn) ? hcf : hcn;

    xn = (p5 + p4 * hc -p2 * xf ^ 4) / (100 + p3 * hc);
    n = n+1;
    


}
