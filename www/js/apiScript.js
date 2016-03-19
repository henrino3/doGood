document.getElementById('amount').value = $scope.donationAmount
document.getElementById('connectToApi').submit()
setTimeout(function () {
  ref.show()
}, 10);
