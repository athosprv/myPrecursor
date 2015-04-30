/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global parseFloat */

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}
$(document).ready(function () {
    $("button#resetButton").on('click keyup', function () {
        location.reload();
    });
});

$(document).ready(function () {
    $("button#submitButton").on('click keyup', function () {
        //alert(document.getElementById("investment").value);
        var prec = new precursor();

        var investorMap = {"Athos": parseFloat(document.getElementById("investment").value)};//, "Emilios": 750};
        var precVal = (1110 + 720) / 2;
        //var r = 0.35, e = 3.49 * .95,  undercut = .01, total = 0.0;
        var r = parseFloat(document.getElementById("rareVal").value),
                e = (parseFloat(document.getElementById("exoVal").value) * .95),
                undercut = parseFloat(document.getElementById("undercut").value);
        var printOuts = false;

        for (i = 0; i < 1; i++) {
            prec.getCost(investorMap, r, e, precVal, undercut, printOuts);
        }
    });
});

function precursor() {
    //var grandTotals = [];  
}

precursor.prototype.getCost = function (investorMap, r, e, precVal, undercut, printOuts) {

    var cost = (400 * r - 124 * 0.2 * 0.85 * e) / 124;
    var investment = 0;

    $.each(investorMap, function (index, value) {
        investment += value;
    });

    var gold = investment;
    /*
     if (printOuts == true) {
     print("Simulating real time Precursor Crafting with Average Cost: " + (cost).toFixed(2) + " gold.");
     }
     */
    var investorAmounts = " - ";

    $.each(investorMap, function (index, value) {
        investorAmounts += index + ": " + value + ". ";
    });
    /*   if (printOuts == true) {
     print("Resources: " + gold + " gold." + investorAmounts);
     }
     */
    var precursorsCrafted = 0;
    var grandTotal = 0;
    while (gold > 0) {
        gold = gold - cost;
        var i = Math.floor((Math.random() * 700) + 1);
        ;
        if (i == 350) {
            precursorsCrafted++;
        }
    }
//    if (printOuts == true) {
//        print("Precursors Crafted: " + precursorsCrafted);        
    $('#numPrecs').val(precursorsCrafted);
//        }

    var total = parseFloat(((precursorsCrafted * precVal * (1 - undercut) * .85 - investment))).toFixed(2);
    //grandTotals.push(total);
    //if (printOuts == true) {
    if (total > 0) {
        // print("Earnings after undercut by " + (undercut * 100) + "% and TP cut: " + total + " gold.");
        $('#result').val("+" + Math.abs(total));
        // print("Everyone makes a profit of: " + (total / investment * 100).toFixed(2) + "%");
        $.each(investorMap, function (index, value) {
            grandTotal = parseFloat((total * value / investment)).toFixed(2);
            //    print(index + " takes home: " + grandTotal + " gold.");
        });
    } else {
        if (precursorsCrafted > 0) {
            //      print("Losses after undercut by " + (undercut * 100) + "% and TP cut: " + Math.abs(total) + " gold.");
            $('#result').val("-" + Math.abs(total));
        } else {
            //    print("Total loss of: " + Math.abs(total) + " gold.");
            $('#result').val("-" + Math.abs(total));
        }
        /*  $.each(investorMap, function (index, value) {
         print(index + " loses: " + parseFloat((Math.abs(total) * value / investment)).toFixed(2) + " gold.");
         });*/
    }
    //   }
    /* 
     * if (printOuts == true) {
     print("------------------------------------");
     }
     */
}