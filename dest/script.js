"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./interface");
(_a = document.getElementById('fournisseur')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    const selectElement = document.getElementById('fournisseur');
    const transactionTitles = document.querySelectorAll('.transaction-title');
    const selectedFournisseur = selectElement.value;
    transactionTitles.forEach(transactionTitle => {
        transactionTitle.classList.remove('om', 'wv', 'wr', 'cb');
        if (selectedFournisseur === 'OM') {
            transactionTitle.classList.add('om');
        }
        else if (selectedFournisseur === 'WV') {
            transactionTitle.classList.add('wv');
        }
        else if (selectedFournisseur === 'WR') {
            transactionTitle.classList.add('wr');
        }
        else if (selectedFournisseur === 'CB') {
            transactionTitle.classList.add('cb');
        }
    });
});
function showNotification(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const notification = document.getElementById('notification');
        const notificationMessage = document.getElementById('notificationMessage');
        notificationMessage.textContent = message;
        notification.style.display = 'block';
        yield new Promise((resolve) => setTimeout(resolve, 3000));
        notification.style.display = 'none';
    });
}
function makeDeposit() {
    return __awaiter(this, void 0, void 0, function* () {
        const destinataireInput = document.getElementById('destinataire');
        const expediteurInput = document.getElementById('expediteur');
        const fournisseurSelect = document.getElementById('fournisseur');
        const montantInput = document.getElementById('montant');
        const destinataire = destinataireInput.value;
        const expediteur = expediteurInput.value;
        const fournisseur = fournisseurSelect.value;
        const montant = parseInt(montantInput.value, 10);
        if (!destinataire || !expediteur || !fournisseur || isNaN(montant)) {
            showNotification("Veuillez remplir tous les champs correctement.");
            return;
        }
        try {
            const transaction = {
                montant,
                numeroSource: expediteur,
                numeroDestinataire: destinataire,
            };
            yield interface_1.TransactionService.depot(transaction);
            showNotification("Dépôt effectué avec succès.");
        }
        catch (error) {
            showNotification("Erreur lors du dépôt : " + error.message);
        }
    });
}
function makeWithdrawal() {
    return __awaiter(this, void 0, void 0, function* () {
        const expediteurInput = document.getElementById('expediteur');
        const fournisseurSelect = document.getElementById('fournisseur');
        const montantInput = document.getElementById('montant');
        const expediteur = expediteurInput.value;
        const fournisseur = fournisseurSelect.value;
        const montant = parseInt(montantInput.value, 10);
        if (!expediteur || !fournisseur || isNaN(montant)) {
            alert("Veuillez remplir tous les champs correctement.");
            return;
        }
        try {
            const transaction = {
                montant,
                numeroSource: expediteur,
                numeroDestinataire: '', // Pas de destinataire pour un retrait
            };
            yield interface_1.TransactionService.retrait(transaction);
            showNotification("Retrait réussi.");
        }
        catch (error) {
            showNotification("Erreur de retrait : " + error.message);
        }
    });
}
(_b = document.getElementById('validerBtn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const trans_type = document.getElementById('type_transaction');
        const selectedValue = trans_type.value;
        if (selectedValue === 'depot') {
            yield makeDeposit();
        }
        else if (selectedValue === 'retrait') {
            yield makeWithdrawal();
        }
    });
});
const trans_type = document.getElementById('type_transaction');
const destinataireSection = document.querySelector('.transaction-section.destinataire');
trans_type.addEventListener('change', function () {
    const selectedValue = trans_type.value;
    if (selectedValue === 'retrait') {
        destinataireSection.classList.add('hidden');
    }
    else {
        destinataireSection.classList.remove('hidden');
    }
});
// Le reste du code reste inchangé
