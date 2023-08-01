document.getElementById('fournisseur')?.addEventListener('change', function () {
    const selectElement = document.getElementById('fournisseur') as HTMLSelectElement;
    const transactionTitles = document.querySelectorAll('.transaction-title') as NodeListOf<HTMLHeadingElement>;
    const selectedFournisseur = selectElement.value;
  
    transactionTitles.forEach(transactionTitle => {
  
        transactionTitle.classList.remove('OM', 'WV', 'WR', 'CB');
  
        if (selectedFournisseur === 'OM') {
            transactionTitle.classList.add('OM');
        } else if (selectedFournisseur === 'WV') {
            transactionTitle.classList.add('WV');
        } else if (selectedFournisseur === 'WR') {
            transactionTitle.classList.add('WR');
        } else if (selectedFournisseur === 'CB') {
            transactionTitle.classList.add('CB');
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
        const endpoint = 'http://127.0.0.1:8000/api/depot';
        const data = { destinataire, expediteur, fournisseur, montant };
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
  
       if (response.ok) {
            showNotification("Dépôt effectué avec succès.");
        } else {
            const responseData = await response.json();
            showNotification("Erreur lors du dépôt : " + responseData.error);
        }
    } catch (error) {
        showNotification("Une erreur s'est produite lors du dépôt : " );
    }
  }
  
  async function makeRetrait() {
    const expediteurInput = document.getElementById('expediteur') as HTMLInputElement;
    const fournisseurSelect = document.getElementById('fournisseur') as HTMLSelectElement;
    const montantInput = document.getElementById('montant') as HTMLInputElement;

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
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            showNotification("Retrait réussi : " + responseData.message);
        } else {
            const errorData = await response.json();
            showNotification("Erreur de retrait : " + errorData.message);
        }
    } catch (error) {
        showNotification("Une erreur s'est produite lors du retrait : ");
    }
}

  
  document.getElementById('validerBtn')?.addEventListener('click', async function () {
    const trans_type = document.getElementById('type_transaction') as HTMLSelectElement;
    const selectedValue = trans_type.value;
  
    if (selectedValue === 'depot') {
        await makeDeposit();
    } else if (selectedValue === 'retrait') {
        await makeRetrait();
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
  
  const destinataireInput = document.getElementById('destinataire') as HTMLInputElement;
  
  destinataireInput.addEventListener('input', async function () {
    const numeroDestinataire = destinataireInput.value;
    if (numeroDestinataire) {
        const nomDestinataire = await getNomDestinataire(numeroDestinataire);
        document.getElementById('destinataire_nom')?.setAttribute('value', nomDestinataire);
    }
  });
  
  const expediteurInput = document.getElementById('expediteur') as HTMLInputElement;
  
  expediteurInput.addEventListener('input', async function () {
    const numeroExpediteur = expediteurInput.value;
    if (numeroExpediteur) {
        const nomExpediteur = await getNomExpediteur(numeroExpediteur);
        document.getElementById('expediteur_nom')?.setAttribute('value', nomExpediteur);
    }
  });
  
  async function getNomDestinataire(numeroDestinataire: string): Promise<string> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/client/${numeroDestinataire}`);
        if (response.ok) {
            const client = await response.json();
  
            if (client.nom) {
                return client.prenom + ' ' + client.nom;
            } else {
                throw new Error("Le nom du destinataire n'a pas été trouvé.");
            }
        } else {
            throw new Error('Erreur lors de la récupération du nom du destinataire.');
        }
    } catch (error) {
        console.error();
        return '';
    }
  }
  
  
  async function getNomExpediteur(numeroDestinataire: string): Promise<string> {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/client/${numeroDestinataire}`);
        if (response.ok) {
            const client = await response.json();
  
            if (client.nom) {
                return client.prenom + ' ' + client.nom;
            } else {
                throw new Error("Le nom du destinataire n'a pas été trouvé.");
            }
        } else {
            throw new Error('Erreur lors de la récupération du nom du destinataire.');
        }
    } catch (error) {
        console.error();
        return '';
    }
  } 