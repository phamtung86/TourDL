package org.example.service;

import org.example.modal.Voucher;
import org.example.reponsitory.VoucherReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VoucherService {
    @Autowired
    private VoucherReponsitory voucherReponsitory;

    // get all voucher
    public List<Voucher> listAllVoucher (){
        return voucherReponsitory.findAll();
    }

    // get Voucher by id
    public Optional<Voucher> findVoucherById(int id) {
        return voucherReponsitory.findById(id);
    }

    // add voucher
    public Voucher createVoucher(Voucher voucher) {
        return voucherReponsitory.save(voucher);
    }

    // update Voucher by ID
    public boolean updateVoucher(int id, Voucher voucher) {
        Optional<Voucher> optionalVoucher = voucherReponsitory.findById(id);
        if (optionalVoucher.isPresent()) {
            Voucher updatedVoucher = optionalVoucher.get();
            updatedVoucher.setVoucherName(voucher.getVoucherName());
            updatedVoucher.setValue(voucher.getValue());
            updatedVoucher.setType(voucher.getType());
            voucherReponsitory.save(updatedVoucher) ;
            return true;
        }
        return false;
    }

    // delete voucher by id
    public boolean deleteVoucher(int id) {
        if(voucherReponsitory.existsById(id)){
            voucherReponsitory.deleteById(id);
            return true;
        }
        return false;
    }

    // total quantity voucher
    public int totalVouchers() {
        return voucherReponsitory.totalVouchers();
    }
}
