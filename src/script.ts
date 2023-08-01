import { TransactionService, TransactionInfo } from './interface';

document.getElementById('fournisseur')?.addEventListener('change', function () {
  const selectElement = document.getElementById('fournisseur') as HTMLSelectElement;
  const transactionTitles = document.querySelectorAll('.transaction-title') as NodeListOf<HTMLHeadingElement>;
  const selectedFournisseur = selectElement.value;

  transactionTitles.forEach(transactionTitle => {

      transactionTitle.classList.remove('om', 'wv', 'wr', 'cb');

      if (selectedFournisseur === 'OM') {
          transactionTitle.classList.add('om');
      } else if (selectedFournisseur === 'WV') {
          transactionTitle.classList.add('wv');
      } else if (selectedFournisseur === 'WR') {
          transactionTitle.classList.add('wr');
      } else if (selectedFournisseur === 'CB') {
          transactionTitle.classList.add('cb');
      }
  })
});

async function showNotification(message: string) {
  const notification = document.getElementById('notification') as HTMLDivElement;
  const notificationMessage = document.getElementById('notificationMessage') as HTMLSpanElement;

  notificationMessage.textContent = message;
  notification.style.display = 'block';

  await new Promise((resolve) => setTimeout(resolve, 3000));

  notification.style.display = 'none';
}

async function makeDeposit() {
  const destinataireInput = document.getElementById('destinataire') as HTMLInputElement;
  const expediteurInput = document.getElementById('expediteur') as HTMLInputElement;
  const fournisseurSelect = document.getElementById('fournisseur') as HTMLSelectElement;
  const montantInput = document.getElementById('montant') as HTMLInputElement;

  const destinataire = destinataireInput.value;
  const expediteur = expediteurInput.value;
  const fournisseur = fournisseurSelect.value;
  const montant = parseInt(montantInput.value, 10);

  if (!destinataire || !expediteur || !fournisseur || isNaN(montant)) {
      showNotification("Veuillez remplir tous les champs correctement.");
      return;
  }

  try {
      const transaction: TransactionInfo = {
          montant,
          numeroSource: expediteur,
          numeroDestinataire: destinataire,
      };

      await TransactionService.depot(transaction);
      showNotification("Dépôt effectué avec succès.");
  } catch (error) {
      showNotification("Erreur lors du dépôt : " + error.message);
  }
}

async function makeWithdrawal() {
  const expediteurInput = document.getElementById('expediteur') as HTMLInputElement;
  const fournisseurSelect = document.getElementById('fournisseur') as HTMLSelectElement;
  const montantInput = document.getElementById('montant') as HTMLInputElement;

  const expediteur = expediteurInput.value;
  const fournisseur = fournisseurSelect.value;
  const montant = parseInt(montantInput.value, 10);

  if (!expediteur || !fournisseur || isNaN(montant)) {
      alert("Veuillez remplir tous les champs correctement.");
      return;
  }

  try {
      const transaction: TransactionInfo = {
          montant,
          numeroSource: expediteur,
          numeroDestinataire: '', // Pas de destinataire pour un retrait
      };

      await TransactionService.retrait(transaction);
      showNotification("Retrait réussi.");
  } catch (error) {
      showNotification("Erreur de retrait : " + error.message);
  }
}

document.getElementById('validerBtn')?.addEventListener('click', async function () {
  const trans_type = document.getElementById('type_transaction') as HTMLSelectElement;
  const selectedValue = trans_type.value;

  if (selectedValue === 'depot') {
      await makeDeposit();
  } else if (selectedValue === 'retrait') {
      await makeWithdrawal();
  }
});

const trans_type = document.getElementById('type_transaction') as HTMLSelectElement;
const destinataireSection = document.querySelector('.transaction-section.destinataire') as HTMLElement;

trans_type.addEventListener('change', function () {
  const selectedValue = trans_type.value;

  if (selectedValue === 'retrait') {
      destinataireSection.classList.add('hidden');
  } else {
      destinataireSection.classList.remove('hidden');
  }
});

// Le reste du code reste inchangé
