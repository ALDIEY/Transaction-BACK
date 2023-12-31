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
(_a = document.getElementById('fournisseur')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    const selectElement = document.getElementById('fournisseur');
    const transactionTitles = document.querySelectorAll('.transaction-title');
    const selectedFournisseur = selectElement.value;
    transactionTitles.forEach(transactionTitle => {
        transactionTitle.classList.remove('OM', 'WV', 'WR', 'CB');
        if (selectedFournisseur === 'OM') {
            transactionTitle.classList.add('OM');
        }
        else if (selectedFournisseur === 'WV') {
            transactionTitle.classList.add('WV');
        }
        else if (selectedFournisseur === 'WR') {
            transactionTitle.classList.add('WR');
        }
        else if (selectedFournisseur === 'CB') {
            transactionTitle.classList.add('CB');
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
            const endpoint = 'http://127.0.0.1:8000/api/depot';
            const data = { destinataire, expediteur, fournisseur, montant };
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                showNotification("Dépôt effectué avec succès.");
            }
            else {
                const responseData = yield response.json();
                showNotification("Erreur lors du dépôt : " + responseData.error);
            }
        }
        catch (error) {
            showNotification("Une erreur s'est produite lors du dépôt : ");
        }
    });
}
function makeRetrait() {
    return __awaiter(this, void 0, void 0, function* () {
        const expediteurInput = document.getElementById('expediteur');
        const fournisseurSelect = document.getElementById('fournisseur');
        const montantInput = document.getElementById('montant');
        const expediteur = expediteurInput.value;
        const fournisseur = fournisseurSelect.value;
        const montant = parseInt(montantInput.value, 10);
        if (!expediteur || !fournisseur || isNaN(montant)) {
            showNotification("Veuillez remplir tous les champs correctement.");
            return;
        }
        try {
            const endpoint = 'http://127.0.0.1:8000/api/retrait';
            const data = { expediteur, fournisseur, montant };
            const response = yield fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = yield response.json();
                showNotification("Retrait réussi : " + responseData.message);
            }
            else {
                const errorData = yield response.json();
                showNotification("Erreur de retrait : " + errorData.message);
            }
        }
        catch (error) {
            showNotification("Une erreur s'est produite lors du retrait : ");
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
            yield makeRetrait();
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
const destinataireInput = document.getElementById('destinataire');
destinataireInput.addEventListener('input', function () {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const numeroDestinataire = destinataireInput.value;
        if (numeroDestinataire) {
            const nomDestinataire = yield getNomDestinataire(numeroDestinataire);
            (_a = document.getElementById('destinataire_nom')) === null || _a === void 0 ? void 0 : _a.setAttribute('value', nomDestinataire);
        }
    });
});
const expediteurInput = document.getElementById('expediteur');
expediteurInput.addEventListener('input', function () {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const numeroExpediteur = expediteurInput.value;
        if (numeroExpediteur) {
            const nomExpediteur = yield getNomExpediteur(numeroExpediteur);
            (_a = document.getElementById('expediteur_nom')) === null || _a === void 0 ? void 0 : _a.setAttribute('value', nomExpediteur);
        }
    });
});
function getNomDestinataire(numeroDestinataire) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://127.0.0.1:8000/api/client/${numeroDestinataire}`);
            if (response.ok) {
                const client = yield response.json();
                if (client.nom) {
                    return client.prenom + ' ' + client.nom;
                }
                else {
                    throw new Error("Le nom du destinataire n'a pas été trouvé.");
                }
            }
            else {
                throw new Error('Erreur lors de la récupération du nom du destinataire.');
            }
        }
        catch (error) {
            console.error();
            return '';
        }
    });
}
function getNomExpediteur(numeroDestinataire) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://127.0.0.1:8000/api/client/${numeroDestinataire}`);
            if (response.ok) {
                const client = yield response.json();
                if (client.nom) {
                    return client.prenom + ' ' + client.nom;
                }
                else {
                    throw new Error("Le nom du destinataire n'a pas été trouvé.");
                }
            }
            else {
                throw new Error('Erreur lors de la récupération du nom du destinataire.');
            }
        }
        catch (error) {
            console.error();
            return '';
        }
    });
}
