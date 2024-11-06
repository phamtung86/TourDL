package org.example.controller;

import org.example.modal.Voucher;
import org.example.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class VoucherController {
    @Autowired
    private VoucherService voucherService;
    @GetMapping("/vouchers")
    public List<Voucher> getAllVoucher() {
        return voucherService.listAllVoucher();
    }

    @GetMapping("/vouchers/{id}")
    public Voucher getVoucherById(@PathVariable int id) {
        Optional<Voucher> isExists = voucherService.findVoucherById(id);
        if (isExists.isPresent()) {
            return isExists.get();
        }
        return null;
    }

    @GetMapping("/TotalVoucher")
    public int getTotalVoucher() {
        return voucherService.totalVouchers();
    }

    @PostMapping("/vouchers")
    public boolean addNewVoucher(@RequestBody Voucher voucher) {
        Voucher newVoucher = voucherService.createVoucher(voucher);
        if (newVoucher != null) {
            return true;
        }
        return false;
    }

    // update voucher

    @PutMapping("/vouchers/{id}")
    public boolean updateVoucher(@PathVariable int id, @RequestBody Voucher voucher) {
        Optional<Voucher> isExists = voucherService.findVoucherById(id);
        if (isExists.isPresent()) {
            voucherService.updateVoucher(id, voucher);
            return true;
        }
        return false;
    }

    @DeleteMapping("vouchers/{id}")
    public boolean deleteVoucher(@PathVariable int id) {
        Optional<Voucher> isExists = voucherService.findVoucherById(id);
        if (isExists.isPresent()) {
            voucherService.deleteVoucher(id);
            return true;
        }
        return false;
    }
}
